import { Link } from "react-router-dom";
import {
  Users,
  UserCog,
  Building2,
  FileBarChart2,
  UserCircle,
} from "lucide-react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400">
        Administrator Dashboard
      </h1>

      <p className="text-gray-400 mt-2 mb-10">
        Welcome to NEXUS Administration Panel
      </p>

      <div className="grid grid-cols-2 gap-8">

        <Link
          to="/admin/doctors"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 transition"
        >
          <UserCog size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Doctor Management
          </h2>

          <p className="text-gray-400 mt-3">
            Manage all doctors.
          </p>
        </Link>

        <Link
          to="/admin/receptionists"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 transition"
        >
          <Users size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Receptionist Management
          </h2>

          <p className="text-gray-400 mt-3">
            Manage reception staff.
          </p>
        </Link>

        <Link
          to="/admin/departments"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 transition"
        >
          <Building2 size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Department Management
          </h2>

          <p className="text-gray-400 mt-3">
            Add and manage departments.
          </p>
        </Link>

        <Link
          to="/admin/reports"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 transition"
        >
          <FileBarChart2 size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Reports
          </h2>

          <p className="text-gray-400 mt-3">
            View hospital reports.
          </p>
        </Link>

        <Link
          to="/admin/profile"
          className="bg-slate-900 border border-cyan-600 rounded-2xl p-8 hover:scale-105 transition col-span-2"
        >
          <UserCircle size={45} className="text-cyan-400 mb-5" />

          <h2 className="text-2xl font-bold">
            Administrator Profile
          </h2>

          <p className="text-gray-400 mt-3">
            View administrator details.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;