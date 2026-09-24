from django.db import transaction

from ..models import (
    AssessmentAttempt,
    AssessmentResult,
    DimensionResult,
)


SCORING_VERSION_FALLBACK = "1.0"


def reverse_score(value, config):
    if config.reverse_rule == "min_plus_max_minus":
        return (
            config.input_min
            + config.input_max
            - value
        )

    raise ValueError(
        f"Unsupported reverse scoring rule: "
        f"{config.reverse_rule}"
    )


def normalize_score(value, config):
    if config.normalization_method == "none":
        return value

    if config.normalization_method == "linear":
        input_range = (
            config.input_max -
            config.input_min
        )

        if input_range == 0:
            raise ValueError(
                "Invalid scoring configuration: "
                "input range cannot be zero."
            )

        normalized = (
            (
                value - config.input_min
            )
            / input_range
        )

        output_range = (
            config.output_max -
            config.output_min
        )

        return (
            config.output_min
            + normalized * output_range
        )

    raise ValueError(
        "Unsupported normalization method: "
        f"{config.normalization_method}"
    )


def aggregate_scores(values, mappings, config):
    if not values:
        return None

    if config.aggregation_method == "sum":
        return sum(values)

    if config.aggregation_method == "mean":
        return sum(values) / len(values)

    if config.aggregation_method == "weighted_mean":
        total_weight = sum(
            mapping.weight
            for mapping in mappings
        )

        if total_weight <= 0:
            raise ValueError(
                "Total dimension weight must be "
                "greater than zero."
            )

        weighted_total = sum(
            value * mapping.weight
            for value, mapping in zip(
                values,
                mappings,
            )
        )

        return weighted_total / total_weight

    raise ValueError(
        "Unsupported aggregation method: "
        f"{config.aggregation_method}"
    )


@transaction.atomic
def calculate_assessment_result(attempt):

    if not attempt.is_completed:
        raise ValueError(
            "Assessment must be completed before scoring."
        )

    try:
        config = (
            attempt.assessment
            .scoring_configuration
        )
    except Exception:
        raise ValueError(
            "Assessment does not have an active "
            "scoring configuration."
        )

    if not config.is_active:
        raise ValueError(
            "Assessment scoring configuration "
            "is not active."
        )

    responses = (
        attempt.responses
        .select_related(
            "question",
            "selected_option",
        )
        .prefetch_related(
            "question__dimension_mappings__dimension",
            "question__options",
        )
    )

    if not responses.exists():
        raise ValueError(
            "Cannot calculate result without responses."
        )

    dimension_data = {}

    for response in responses:

        question = response.question
        selected_option = response.selected_option

        mappings = list(
            question.dimension_mappings.all()
        )

        for mapping in mappings:

            value = selected_option.value

            if mapping.reverse_scored:
                value = reverse_score(
                    value,
                    config,
                )

            dimension_id = mapping.dimension_id

            if dimension_id not in dimension_data:
                dimension_data[dimension_id] = {
                    "dimension": mapping.dimension,
                    "values": [],
                    "mappings": [],
                }

            dimension_data[
                dimension_id
            ]["values"].append(value)

            dimension_data[
                dimension_id
            ]["mappings"].append(mapping)

    if not dimension_data:
        raise ValueError(
            "No dimension mappings were found "
            "for this assessment."
        )

    result, _ = AssessmentResult.objects.update_or_create(
        attempt=attempt,
        defaults={
            "scoring_version": config.version,
        },
    )

    result.dimension_results.all().delete()

    for data in dimension_data.values():

        raw_score = aggregate_scores(
            data["values"],
            data["mappings"],
            config,
        )

        if raw_score is None:
            continue

        normalized_score = normalize_score(
            raw_score,
            config,
        )

        DimensionResult.objects.create(
            result=result,
            dimension=data["dimension"],
            raw_score=round(
                raw_score,
                4,
            ),
            normalized_score=round(
                normalized_score,
                2,
            ),
        )

    return result