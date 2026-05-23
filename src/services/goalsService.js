import axios from "axios";

const API_URL = "http://localhost:3000";

const config = {
  headers: {
    Authorization: "mi_api_key_123",
  },
};

export const getGoals = async () => {
  const response = await axios.get(
    `${API_URL}/getGoals`,
    config
  );

  return response.data;
};

export const createGoal = async (goalData) => {
  const response = await axios.post(
    `${API_URL}/addGoal`,
    goalData,
    config
  );

  return response.data;
};

export const removeGoal = async (id) => {
  await axios.delete(
    `${API_URL}/removeGoal/${id}`,
    config
  );

  return id;
};