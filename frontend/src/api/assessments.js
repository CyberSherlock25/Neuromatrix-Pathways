import api from "./client";

export const getAssessment = async (slug) => {
  const response = await api.get(`/assessments/${slug}/`);
  return response.data;
};

export const startAttempt = async (slug, sessionId = "") => {
  const response = await api.post(
    `/assessments/${slug}/attempts/`,
    {
      session_id: sessionId,
    }
  );

  return response.data;
};

export const saveResponse = async (
  attemptId,
  questionId,
  selectedOptionId
) => {
  const response = await api.post(
    `/assessments/attempts/${attemptId}/responses/`,
    {
      question: questionId,
      selected_option: selectedOptionId,
    }
  );

  return response.data;
};

export const completeAttempt = async (attemptId) => {
  const response = await api.post(
    `/assessments/attempts/${attemptId}/complete/`,
    {}
  );

  return response.data;
};