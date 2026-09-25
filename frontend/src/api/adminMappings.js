import api from "./client";


export const getDimensions = async () => {

  const response = await api.get(
    "/assessments/admin/dimensions/"
  );

  return response.data;
};


export const getQuestionDimensions = async ({
  questionId,
  dimensionId,
} = {}) => {

  const params =
    new URLSearchParams();


  if (questionId) {

    params.append(
      "question",
      questionId
    );

  }


  if (dimensionId) {

    params.append(
      "dimension",
      dimensionId
    );

  }


  const queryString =
    params.toString();


  const response = await api.get(
    `/assessments/admin/question-dimensions/${
      queryString
        ? `?${queryString}`
        : ""
    }`
  );


  return response.data;
};


export const createQuestionDimension =
  async (mappingData) => {

    const response =
      await api.post(
        "/assessments/admin/question-dimensions/",
        mappingData
      );

    return response.data;
  };