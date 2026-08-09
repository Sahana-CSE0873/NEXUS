import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-slate-900 border-r border-cyan-600 p-6 flex flex-col">

      <div>

        <h1 className="text-3xl font-bold text-cyan-400">
          NEXUS
        </h1>

        <p className="text-gray-400 text-sm mb-10">
          Smart Patient Journey
        </p>

      </div>

      <div className="space-y-4 flex-1">

        <NavLink
          to="/patient"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 transition ${
              isActive
                ? "bg-cyan-500 text-black font-bold"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/patient/appointments"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 transition ${
              isActive
                ? "bg-cyan-500 text-black font-bold"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          📅 My Appointments
        </NavLink>

        <NavLink
          to="/patient/prescriptions"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 transition ${
              isActive
                ? "bg-cyan-500 text-black font-bold"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          💊 Prescriptions
        </NavLink>

        <NavLink
          to="/patient/history"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 transition ${
              isActive
                ? "bg-cyan-500 text-black font-bold"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          📄 Medical History
        </NavLink>

        <NavLink
          to="/patient/billing"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 transition ${
              isActive
                ? "bg-cyan-500 text-black font-bold"
                : "text-white hover:text-cyan-400"
            }`
          }
        >
          💳 Billing
        </NavLink>

      </div>

      <button
        onClick={() => navigate("/login")}
        className="bg-red-500 hover:bg-red-600 rounded-lg py-3 font-semibold mt-5"
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default Sidebar;