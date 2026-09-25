import api from "./client";

export const getDimensions = async () => {
  const response = await api.get(
    "/assessments/admin/dimensions/"
  );

  return response.data;
};

export const createDimension = async (dimensionData) => {
  const response = await api.post(
    "/assessments/admin/dimensions/",
    dimensionData
  );

  return response.data;
};