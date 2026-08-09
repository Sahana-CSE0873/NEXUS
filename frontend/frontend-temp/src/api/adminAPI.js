import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getReports = async () => {
  const response = await axios.get(`${API}/admins/reports`);
  return response.data;
};