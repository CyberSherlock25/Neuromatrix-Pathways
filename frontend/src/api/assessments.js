import api from "./client";

export const getAssessment = async (slug) => {
    const response = await api.get(`/assessments/${slug}/`);
    return response.data;
};