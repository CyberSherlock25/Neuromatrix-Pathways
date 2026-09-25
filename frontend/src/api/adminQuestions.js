import api from "./client";

// -------------------------
// Sections
// -------------------------

export const getSections = async (assessmentId) => {
  const response = await api.get(
    `/assessments/admin/sections/?assessment=${assessmentId}`
  );

  return response.data;
};

export const createSection = async (sectionData) => {
  const response = await api.post(
    "/assessments/admin/sections/",
    sectionData
  );

  return response.data;
};


// -------------------------
// Questions
// -------------------------

export const getQuestions = async (sectionId) => {
  const response = await api.get(
    `/assessments/admin/questions/?section=${sectionId}`
  );

  return response.data;
};

export const createQuestion = async (questionData) => {
  const response = await api.post(
    "/assessments/admin/questions/",
    questionData
  );

  return response.data;
};


// -------------------------
// Options
// -------------------------

export const getOptions = async (questionId) => {
  const response = await api.get(
    `/assessments/admin/options/?question=${questionId}`
  );

  return response.data;
};

export const createOption = async (optionData) => {
  const response = await api.post(
    "/assessments/admin/options/",
    optionData
  );

  return response.data;
};