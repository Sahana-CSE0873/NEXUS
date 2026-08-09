import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Patient");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!userId.trim() || !password.trim()) {
      alert("Please enter User ID and Password");
      return;
    }

    try {
      setLoading(true);

      let endpoint = "";
      let loginData = {};

      // =========================
      // PATIENT LOGIN
      // =========================
      if (role === "Patient") {
        endpoint = "/patients/login";

        loginData = {
          patient_id: userId.trim(),
          password: password,
        };
      }

      // =========================
      // DOCTOR LOGIN
      // =========================
      else if (role === "Doctor") {
        endpoint = "/login/doctor";

        loginData = {
          doctor_id: userId.trim(),
          password: password,
        };
      }

      // =========================
      // RECEPTIONIST LOGIN
      // =========================
      else if (role === "Receptionist") {
        endpoint = "/login/receptionist";

        loginData = {
          receptionist_id: userId.trim(),
          password: password,
        };
      }

      // =========================
      // ADMINISTRATOR LOGIN
      // =========================
      else if (role === "Administrator") {
        endpoint = "/login/admin";

        loginData = {
          administrator_id: userId.trim(),
          password: password,
        };
      }

      console.log("Login Role:", role);
      console.log("Login Endpoint:", endpoint);
      console.log("Login Data:", loginData);

      // Send request to FastAPI
      const response = await API.post(endpoint, loginData);

      console.log("Login Response:", response.data);

      alert(response.data.message);

      // =========================
      // NAVIGATION
      // =========================

      if (role === "Patient") {
        navigate("/patient");
      }

      else if (role === "Doctor") {
        navigate("/doctor");
      }

      else if (role === "Receptionist") {
        navigate("/receptionist");
      }

      else if (role === "Administrator") {
        navigate("/admin");
      }

    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Backend Response:", error.response.data);

        alert(
          error.response.data?.message ||
          `Login failed (${error.response.status})`
        );
      } else {
        alert("Backend Server Not Running");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md bg-slate-900 border border-cyan-600 rounded-2xl p-8 shadow-2xl">

        {/* NEXUS TITLE */}
        <h1 className="text-4xl font-bold text-cyan-400 text-center">
          NEXUS
        </h1>

        <p className="text-center text-gray-400 mt-2 mb-8">
          Smart Patient Journey
        </p>

        {/* ROLE */}
        <label className="text-gray-300 font-semibold">
          Select Role
        </label>

        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setUserId("");
            setPassword("");
          }}
          className="w-full mt-2 mb-5 p-3 rounded-lg bg-slate-800 text-white border border-cyan-500 outline-none"
        >
          <option value="Patient">
            Patient
          </option>

          <option value="Doctor">
            Doctor
          </option>

          <option value="Receptionist">
            Receptionist
          </option>

          <option value="Administrator">
            Administrator
          </option>
        </select>

        {/* USER ID */}
        <label className="text-gray-300 font-semibold">
          User ID
        </label>

        <input
          type="text"
          placeholder={`Enter ${role} ID`}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full mt-2 mb-5 p-3 rounded-lg bg-slate-800 text-white border border-cyan-500 outline-none"
        />

        {/* PASSWORD */}
        <label className="text-gray-300 font-semibold">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          className="w-full mt-2 mb-8 p-3 rounded-lg bg-slate-800 text-white border border-cyan-500 outline-none"
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 rounded-xl transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>
    </div>
  );
}

export default Login;