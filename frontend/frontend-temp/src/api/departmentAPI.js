import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getDepartments = async () => {
  const response = await axios.get(`${API}/departments/all`);
  return response.data;
};