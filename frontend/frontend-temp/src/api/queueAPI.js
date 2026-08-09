import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getQueue = async () => {
  const response = await axios.get(`${API}/queue`);
  return response.data;
};