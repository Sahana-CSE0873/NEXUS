import { Link } from "react-router-dom";

import {
  UserPlus,
  CalendarPlus,
  ClipboardList,
  Users,
} from "lucide-react";

function ReceptionistDashboard() {
  return (
    <div className="p-8 min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <h1 className="text-4xl font-bold text-cyan-400 mb-2">
        Receptionist Dashboard
      </h1>

      <p className="text-gray-400 mb-10">
        Welcome to NEXUS Reception Panel
      </p>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Register Patient */}
        <Link
          to="/receptionist/register"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 hover:border-cyan-400 transition"
        >
          <UserPlus size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Register Patient
          </h2>

          <p className="text-gray-400 mt-3">
            Register new patients into NEXUS.
          </p>
        </Link>


        {/* Book Appointment */}
        <Link
          to="/receptionist/appointment"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 hover:border-cyan-400 transition"
        >
          <CalendarPlus size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Book Appointment
          </h2>

          <p className="text-gray-400 mt-3">
            Schedule appointments with doctors.
          </p>
        </Link>


        {/* Queue Management */}
        <Link
          to="/receptionist/queue"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 hover:border-cyan-400 transition"
        >
          <ClipboardList size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Queue Management
          </h2>

          <p className="text-gray-400 mt-3">
            Generate and monitor patient queue.
          </p>
        </Link>


        {/* Patient Records */}
        <Link
          to="/receptionist/patients"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 hover:border-cyan-400 transition"
        >
          <Users size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Patient Records
          </h2>

          <p className="text-gray-400 mt-3">
            Search registered patients.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default ReceptionistDashboard;