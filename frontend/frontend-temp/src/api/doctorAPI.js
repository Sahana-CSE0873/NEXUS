import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getDoctors = async () => {
  const response = await axios.get(`${API}/doctors/all`);
  return response.data;
};