import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getQueue } from "../api/queueAPI";

import {
  Bell,
  Search,
  User,
  Calendar,
  Users,
  Activity,
  ClipboardList,
  LogOut,
} from "lucide-react";

function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [queue, setQueue] = useState([]);

  // ==========================
  // Load Doctor Details
  // ==========================

  const loadDoctor = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/doctors/dashboard/NXD000001"
      );

      setDoctor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Load Queue
  // ==========================

  const loadQueue = async () => {
    try {
      const data = await getQueue();
      setQueue(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDoctor();
    loadQueue();
  }, []);

  // ==========================
  // Loading Screen
  // ==========================

  if (!doctor) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-cyan-400 text-3xl">
        Loading Doctor Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================= Sidebar ================= */}

      <div className="w-72 bg-slate-900 border-r border-cyan-700 flex flex-col">

        <div className="p-8">

          <h1 className="text-4xl font-bold text-cyan-400">
            NEXUS
          </h1>

          <p className="text-gray-400 mt-2">
            Smart Patient Journey
          </p>

        </div>

        <div className="flex-1 px-5">

          <nav className="space-y-3">

            <Link
              to="/doctor"
              className="flex items-center gap-4 bg-cyan-500 text-black font-semibold rounded-xl px-5 py-4"
            >
              <Activity size={22} />
              Dashboard
            </Link>

            <Link
              to="/doctor/patients"
              className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-slate-800 transition"
            >
              <Users size={22} />
              Today's Patients
            </Link>

            <Link
              to="/doctor/appointments"
              className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-slate-800 transition"
            >
              <Calendar size={22} />
              Appointments
            </Link>

            <Link
              to="/doctor/prescriptions"
              className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-slate-800 transition"
            >
              <ClipboardList size={22} />
              Prescriptions
            </Link>

            <Link
              to="/doctor/profile"
              className="flex items-center gap-4 rounded-xl px-5 py-4 hover:bg-slate-800 transition"
            >
              <User size={22} />
              Profile
            </Link>

          </nav>

        </div>

        <div className="p-5 border-t border-slate-700">

          <button className="w-full flex items-center gap-4 rounded-xl px-5 py-4 text-red-400 hover:bg-slate-800 transition">

            <LogOut size={22} />

            Logout

          </button>

        </div>

      </div>

      {/* ================= Main Content ================= */}

      <div className="flex-1 flex flex-col">

        {/* ================= Navbar ================= */}

        <div className="h-24 bg-slate-900 border-b border-cyan-700 flex items-center justify-between px-10">

          <div>

            <h1 className="text-4xl font-bold text-cyan-400">
              Doctor Dashboard
            </h1>

            <p className="text-gray-400 mt-1">
              Welcome to NEXUS Smart Patient Journey
            </p>

          </div>

          <div className="flex items-center gap-8">

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-3.5 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search Patient..."
                className="bg-slate-800 border border-cyan-600 rounded-xl pl-12 pr-5 py-3 w-80 outline-none"
              />

            </div>

            <button className="relative">

              <Bell
                size={26}
                className="text-yellow-400"
              />

              <span className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full text-xs flex items-center justify-center">
                5
              </span>

            </button>

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black text-2xl font-bold">
                D
              </div>

              <div>

                <h2 className="font-bold">
                  {doctor.doctor_name}
                </h2>

                <p className="text-gray-400 text-sm">
                  {doctor.doctor_id}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Page Body ================= */}

        <div className="flex-1 overflow-y-auto p-10">

          {/* Welcome Banner */}

          <div className="bg-gradient-to-r from-cyan-600 via-slate-800 to-slate-900 rounded-3xl p-10 mb-8">

            <h2 className="text-5xl font-bold">

              Welcome Back,

              <span className="text-cyan-300">

                {" "}{doctor.doctor_name} 👨‍⚕️

              </span>

            </h2>

            <p className="text-gray-300 mt-4 text-lg">

              Manage appointments, monitor patients,
              prescribe medicines and provide better
              healthcare through AI-powered NEXUS.

            </p>

          </div>
{/* ================= Top Dashboard Cards ================= */}

<div className="grid grid-cols-4 gap-6 mt-8">

  {/* ================= Current Patient ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

    <h2 className="text-cyan-400 text-xl font-bold mb-5">
      👤 Current Patient
    </h2>

    <p className="text-3xl font-bold">
      {queue.length > 0 ? queue[0].patient_name : "No Patient"}
    </p>

    <p className="text-gray-400 mt-3">
      Patient ID
    </p>

    <p className="text-green-400 font-semibold">
      {queue.length > 0 ? queue[0].patient_id : "-"}
    </p>

    <p className="text-gray-400 mt-4">
      Department
    </p>

    <p className="text-yellow-300">
      {doctor.specialization}
    </p>

    <button className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl transition">
      Start Consultation
    </button>

  </div>

  {/* ================= Today's Queue ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

    <h2 className="text-cyan-400 text-xl font-bold mb-5">
      👥 Today's Queue
    </h2>

    <div className="text-center">

      <h1 className="text-7xl font-bold text-cyan-400">
        {queue.length}
      </h1>

      <p className="text-gray-400 mt-2">
        Patients Waiting
      </p>

    </div>

    <div className="mt-8 space-y-4">

      <div className="flex justify-between">

        <span>Completed</span>

        <span className="text-green-400 font-bold">
          15
        </span>

      </div>

      <div className="flex justify-between">

        <span>Remaining</span>

        <span className="text-yellow-400 font-bold">
          {queue.length}
        </span>

      </div>

    </div>

  </div>

  {/* ================= Today's Schedule ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

    <h2 className="text-cyan-400 text-xl font-bold mb-5">
      📅 Today's Schedule
    </h2>

    <div className="space-y-5">

      <div>

        <p className="font-bold text-yellow-400">
          10:30 AM
        </p>

        <p className="text-gray-300">
          General Checkup
        </p>

      </div>

      <div>

        <p className="font-bold text-yellow-400">
          11:00 AM
        </p>

        <p className="text-gray-300">
          Diabetes Consultation
        </p>

      </div>

      <div>

        <p className="font-bold text-yellow-400">
          12:00 PM
        </p>

        <p className="text-gray-300">
          Emergency Consultation
        </p>

      </div>

      <div>

        <p className="font-bold text-yellow-400">
          02:00 PM
        </p>

        <p className="text-gray-300">
          Follow-up Consultation
        </p>

      </div>

    </div>

  </div>

  {/* ================= Today's Statistics ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg hover:scale-105 transition duration-300">

    <h2 className="text-cyan-400 text-xl font-bold mb-5">
      📊 Today's Statistics
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between">

        <span>Total Patients</span>

        <span className="text-cyan-400 font-bold">
          28
        </span>

      </div>

      <div className="flex justify-between">

        <span>Appointments</span>

        <span className="text-green-400 font-bold">
          22
        </span>

      </div>

      <div className="flex justify-between">

        <span>Emergency</span>

        <span className="text-red-400 font-bold">
          2
        </span>

      </div>

      <div className="flex justify-between">

        <span>Completed</span>

        <span className="text-yellow-400 font-bold">
          15
        </span>

      </div>

    </div>

  </div>

</div>
{/* ================= Lower Section ================= */}

<div className="grid grid-cols-3 gap-6 mt-8">

  {/* ================= Live Notifications ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-cyan-400 mb-6">
      🔔 Live Notifications
    </h2>

    <div className="space-y-5">

      <div className="border-l-4 border-green-500 pl-4">

        <h3 className="font-bold text-green-400">
          New Patient Checked In
        </h3>

        <p className="text-gray-400 text-sm">
          Queue Number : 13
        </p>

      </div>

      <div className="border-l-4 border-yellow-500 pl-4">

        <h3 className="font-bold text-yellow-400">
          Emergency Patient
        </h3>

        <p className="text-gray-400 text-sm">
          Requires Immediate Attention
        </p>

      </div>

      <div className="border-l-4 border-pink-500 pl-4">

        <h3 className="font-bold text-pink-400">
          Lab Report Ready
        </h3>

        <p className="text-gray-400 text-sm">
          Blood Test Completed
        </p>

      </div>

      <div className="border-l-4 border-cyan-500 pl-4">

        <h3 className="font-bold text-cyan-400">
          Consultation Finished
        </h3>

        <p className="text-gray-400 text-sm">
          Queue Updated Successfully
        </p>

      </div>

    </div>

  </div>

  {/* ================= AI Health Insights ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-cyan-400 mb-6">
      🤖 AI Health Insights
    </h2>

    <div className="space-y-5">

      <div className="bg-slate-800 rounded-xl p-4">

        <h3 className="font-bold text-green-400">
          Patient Risk
        </h3>

        <p className="text-gray-400 mt-2">
          Low Risk
        </p>

      </div>

      <div className="bg-slate-800 rounded-xl p-4">

        <h3 className="font-bold text-yellow-400">
          Recommendation
        </h3>

        <p className="text-gray-400 mt-2">
          Encourage hydration and
          balanced diet.
        </p>

      </div>

      <div className="bg-slate-800 rounded-xl p-4">

        <h3 className="font-bold text-cyan-400">
          Next Follow-up
        </h3>

        <p className="text-gray-400 mt-2">
          Suggested after 30 days.
        </p>

      </div>

    </div>

  </div>

  {/* ================= Quick Actions ================= */}

  <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 shadow-lg">

    <h2 className="text-2xl font-bold text-cyan-400 mb-6">
      ⚡ Quick Actions
    </h2>

    <div className="grid gap-4">

      <button className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-xl transition">
        Write Prescription
      </button>

      <button className="bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-xl transition">
        View Medical History
      </button>

      <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition">
        Request Lab Test
      </button>

      <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl transition">
        Complete Consultation
      </button>

    </div>

  </div>

</div>
        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;