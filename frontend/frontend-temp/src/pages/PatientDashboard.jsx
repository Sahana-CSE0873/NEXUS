import { useEffect, useState } from "react";
import axios from "axios";
function PatientDashboard() {
  const [patient, setPatient] = useState(null);

useEffect(() => {
    axios
        .get("http://127.0.0.1:8000/patients/dashboard/NXP000001")
        .then((res) => {
            setPatient(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
}, []);
if (!patient) {
    return (
        <div className="text-white text-3xl flex items-center justify-center h-screen">
            Loading Dashboard...
        </div>
    );
}
  return (
    <div>

      {/* Welcome Banner */}
<div className="bg-gradient-to-r from-cyan-900 via-slate-900 to-cyan-800 rounded-3xl border border-cyan-500 p-10 shadow-2xl mb-10">

  <h1 className="text-6xl font-extrabold text-cyan-300 tracking-wide">
    👋 Welcome Back, {patient.patient_name}
  </h1>

  <p className="mt-4 text-xl text-gray-300">
    We hope you're having a healthy day.
  </p>

  <div className="flex gap-10 mt-10">

    <div>
      <h3 className="text-gray-400">
        Queue Status
      </h3>

      <p className="text-green-400 text-2xl font-bold">
        Waiting
      </p>
    </div>

    <div>
      <h3 className="text-gray-400">
        Today's Appointment
      </h3>

      <p className="text-yellow-400 text-2xl font-bold">
        10:30 AM
      </p>
    </div>

  </div>

</div>
      {/* Premium Dashboard Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

  {/* Queue Number */}
  <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
    <p className="text-gray-300 text-sm font-semibold">
      Queue Number
    </p>

    <h1 className="text-6xl font-bold text-cyan-400 mt-5">
      {patient.queue_number}
    </h1>

    <p className="mt-4 text-green-400 font-semibold">
      ● Waiting
    </p>

  </div>

  {/* Doctor */}
  <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
    <p className="text-gray-300 text-sm font-semibold">
      Assigned Doctor
    </p>

    <h2 className="text-3xl font-bold text-green-400 mt-5">
      {patient.assigned_doctor}
    </h2>

    <p className="mt-4 text-gray-300">
      {patient.department}
    </p>

  </div>

  {/* Appointment */}
  <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
    <p className="text-gray-300 text-sm font-semibold">
      Appointment
    </p>

    <h2 className="text-3xl font-bold text-yellow-400 mt-5">
      {patient.appointment_time}
    </h2>

    <p className="mt-4 text-gray-300">
      Today
    </p>

  </div>

  {/* Billing */}
  <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
    <p className="text-gray-300 text-sm font-semibold">
      Billing
    </p>

    <h2 className="text-3xl font-bold text-pink-400 mt-5">
      ₹{patient.billing_amount}
    </h2>

    <p className="mt-4 text-green-400">
      Paid Successfully
    </p>

  </div>

</div>
      {/* AI Queue & Notifications */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">

  {/* Queue Progress */}

<div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">

  <h2 className="text-3xl font-bold text-cyan-400 mb-10">
    Queue Progress
  </h2>

  <div className="flex justify-center">

    <div className="relative w-52 h-52">

      {/* Outer Circle */}
      <div className="absolute inset-0 rounded-full border-[12px] border-slate-700"></div>

      {/* Progress Circle */}
      <div className="absolute inset-0 rounded-full border-[12px] border-cyan-400 animate-pulse"></div>

      {/* Center */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <h1 className="text-6xl font-bold text-cyan-400">
          12
        </h1>

        <p className="text-gray-400">
          Queue No
        </p>

      </div>

    </div>

  </div>

  <div className="mt-10 space-y-5">

    <div className="flex justify-between text-lg">
      <span>Patients Ahead</span>
      <span className="font-bold text-cyan-400">5</span>
    </div>

    <div className="flex justify-between text-lg">
      <span>Estimated Wait</span>
      <span className="font-bold text-green-400">15 Minutes</span>
    </div>

    <div className="flex justify-between text-lg">
      <span>Status</span>
      <span className="font-bold text-yellow-400">
        {patient.status}
      </span>
    </div>

  </div>

</div>
  {/* Live Notifications */}

<div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
  <h2 className="text-3xl font-bold text-cyan-400 mb-10">
    Live Notifications
  </h2>

  <div className="space-y-5">

    <div className="bg-slate-800 rounded-2xl border-l-4 border-green-500 p-5 hover:scale-105 transition">

      <h3 className="text-green-400 font-bold text-lg">
        Appointment Confirmed
      </h3>

      <p className="text-gray-400 mt-2">
        Your appointment is confirmed.
      </p>

    </div>

    <div className="bg-slate-800 rounded-2xl border-l-4 border-yellow-500 p-5 hover:scale-105 transition">

      <h3 className="text-yellow-400 font-bold text-lg">
        Queue Updated
      </h3>

      <p className="text-gray-400 mt-2">
        Only 5 patients are ahead.
      </p>

    </div>

    <div className="bg-slate-800 rounded-2xl border-l-4 border-cyan-500 p-5 hover:scale-105 transition">

      <h3 className="text-cyan-400 font-bold text-lg">
        Doctor Available
      </h3>

      <p className="text-gray-400 mt-2">
        Doctor has entered the consultation room.
      </p>

    </div>

    <div className="bg-slate-800 rounded-2xl border-l-4 border-pink-500 p-5 hover:scale-105 transition">

      <h3 className="text-pink-400 font-bold text-lg">
        Payment Successful
      </h3>

      <p className="text-gray-400 mt-2">
        ₹850 received successfully.
      </p>

    </div>

  </div>

</div>
  <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
  <h2 className="text-3xl font-bold text-cyan-400 mb-10">
    Recent Activity
  </h2>

  <div className="space-y-6">

    <div className="flex items-center gap-5">
      <div className="w-4 h-4 rounded-full bg-green-500"></div>
      <div>
        <h3 className="font-bold">Checked In Successfully</h3>
        <p className="text-gray-400 text-sm">09:45 AM</p>
      </div>
    </div>

    <div className="flex items-center gap-5">
      <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
      <div>
        <h3 className="font-bold">Queue Generated</h3>
        <p className="text-gray-400 text-sm">Queue Number : 12</p>
      </div>
    </div>

    <div className="flex items-center gap-5">
      <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
      <div>
        <h3 className="font-bold">Doctor Assigned</h3>
        <p className="text-gray-400 text-sm">Dr. Ravi Kumar</p>
      </div>
    </div>

    <div className="flex items-center gap-5">
      <div className="w-4 h-4 rounded-full bg-pink-400"></div>
      <div>
        <h3 className="font-bold">Payment Completed</h3>
        <p className="text-gray-400 text-sm">₹850 Paid Successfully</p>
      </div>
    </div>

  </div>

</div>
<div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30">
  <h2 className="text-3xl font-bold text-cyan-400 mb-10">
    AI Health Insights
  </h2>

  <div className="grid grid-cols-2 gap-8">

    <div className="bg-slate-800 rounded-2xl p-5">
      <p className="text-gray-400">Blood Group</p>
      <h3 className="text-2xl font-bold text-red-400 mt-2">
        O+
      </h3>
    </div>

    <div className="bg-slate-800 rounded-2xl p-5">
      <p className="text-gray-400">BMI</p>
      <h3 className="text-2xl font-bold text-cyan-400 mt-2">
        22.5
      </h3>
    </div>

    <div className="bg-slate-800 rounded-2xl p-5">
      <p className="text-gray-400">Height</p>
      <h3 className="text-2xl font-bold text-green-400 mt-2">
        170 cm
      </h3>
    </div>

    <div className="bg-slate-800 rounded-2xl p-5">
      <p className="text-gray-400">Weight</p>
      <h3 className="text-2xl font-bold text-yellow-400 mt-2">
        65 kg
      </h3>
    </div>

  </div>

  <div className="mt-8 bg-cyan-950 rounded-2xl p-6 border border-cyan-500">

    <h3 className="text-xl font-bold text-cyan-300">
      AI Recommendation
    </h3>

    <p className="text-gray-300 mt-3">
      Drink more water, maintain a balanced diet, and walk
      for at least <span className="text-green-400 font-bold">30 minutes</span> daily.
    </p>

  </div>

</div>

      </div>

    </div>
  );
}

export default PatientDashboard;