import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getReceptionists = async () => {
  const response = await axios.get(`${API}/receptionists/all`);
  return response.data;
};