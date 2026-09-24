import api from "./client";

export const getAdminAssessments = async () => {
  const response = await api.get("/assessments/admin/assessments/");
  return response.data;
};

export const createAdminAssessment = async (assessmentData) => {
  const response = await api.post(
    "/assessments/admin/assessments/",
    assessmentData
  );
  return response.data;
};

export const getAdminAssessment = async (id) => {
  const response = await api.get(
    `/assessments/admin/assessments/${id}/`
  );
  return response.data;
};

export const updateAdminAssessment = async (id, assessmentData) => {
  const response = await api.patch(
    `/assessments/admin/assessments/${id}/`,
    assessmentData
  );
  return response.data;
};

export const deleteAdminAssessment = async (id) => {
  const response = await api.delete(
    `/assessments/admin/assessments/${id}/`
  );
  return response.data;
};