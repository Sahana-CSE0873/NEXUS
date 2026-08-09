import axios from "axios";

const API = "http://127.0.0.1:8000";

export const getPatientDashboard = async (patientId) => {
  const response = await axios.get(`${API}/patients/dashboard/${patientId}`);
  return response.data;
};