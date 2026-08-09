import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

import MainLayout from "../layouts/MainLayout";

import PatientDashboard from "../pages/PatientDashboard";
import PatientAppointments from "../pages/PatientAppointments";
import PatientPrescriptions from "../pages/PatientPrescriptions";
import PatientHistory from "../pages/PatientHistory";
import PatientBilling from "../pages/PatientBilling";

import DoctorDashboard from "../pages/DoctorDashboard";
import DoctorPatients from "../pages/DoctorPatients";
import DoctorAppointments from "../pages/DoctorAppointments";
import DoctorPrescriptions from "../pages/DoctorPrescriptions";
import DoctorProfile from "../pages/DoctorProfile";

import ReceptionistDashboard from "../pages/ReceptionistDashboard";
import RegisterPatient from "../pages/RegisterPatient";
import ReceptionistAppointment from "../pages/ReceptionistAppointment";
import ReceptionistQueue from "../pages/ReceptionistQueue";
import ReceptionistPatients from "../pages/ReceptionistPatients";

import AdminDashboard from "../pages/AdminDashboard";
import DoctorManagement from "../pages/DoctorManagement";
import ReceptionistManagement from "../pages/ReceptionistManagement";
import DepartmentManagement from "../pages/DepartmentManagement";
import Reports from "../pages/Reports";
import AdminProfile from "../pages/AdminProfile";

function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* PATIENT */}
      <Route element={<MainLayout />}>
        <Route path="/patient" element={<PatientDashboard />} />
        <Route
          path="/patient/appointments"
          element={<PatientAppointments />}
        />
        <Route
          path="/patient/prescriptions"
          element={<PatientPrescriptions />}
        />
        <Route
          path="/patient/history"
          element={<PatientHistory />}
        />
        <Route
          path="/patient/billing"
          element={<PatientBilling />}
        />
      </Route>

      {/* DOCTOR */}
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/patients" element={<DoctorPatients />} />
      <Route
        path="/doctor/appointments"
        element={<DoctorAppointments />}
      />
      <Route
        path="/doctor/prescriptions"
        element={<DoctorPrescriptions />}
      />
      <Route path="/doctor/profile" element={<DoctorProfile />} />

      {/* RECEPTIONIST */}
      <Route
        path="/receptionist"
        element={<ReceptionistDashboard />}
      />

      <Route
        path="/receptionist/register"
        element={<RegisterPatient />}
      />

      <Route
        path="/receptionist/appointment"
        element={<ReceptionistAppointment />}
      />

      <Route
        path="/receptionist/queue"
        element={<ReceptionistQueue />}
      />

      <Route
        path="/receptionist/patients"
        element={<ReceptionistPatients />}
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={<AdminDashboard />}
      />

      <Route
        path="/admin/doctors"
        element={<DoctorManagement />}
      />

      <Route
        path="/admin/receptionists"
        element={<ReceptionistManagement />}
      />

      <Route
        path="/admin/departments"
        element={<DepartmentManagement />}
      />

      <Route
        path="/admin/reports"
        element={<Reports />}
      />

      <Route
        path="/admin/profile"
        element={<AdminProfile />}
      />

    </Routes>
  );
}

export default AppRoutes;