import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";

function DoctorAppointments() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            Doctor Appointments
          </h1>

          <p className="text-gray-400 mt-2">
            View today's scheduled appointments.
          </p>
        </div>

        <Link
          to="/doctor"
          className="bg-cyan-500 text-black px-5 py-3 rounded-xl font-bold hover:bg-cyan-600"
        >
          <ArrowLeft className="inline mr-2" size={18} />
          Back
        </Link>

      </div>

      <div className="grid gap-5">

        <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Sahana Rudraganti
            </h2>

            <p className="text-gray-400 mt-2">
              Appointment ID : APT000001
            </p>

            <p className="text-yellow-400 mt-2">
              Time : 10:30 AM
            </p>

          </div>

          <Calendar
            size={45}
            className="text-cyan-400"
          />

        </div>

      </div>

    </div>
  );
}

export default DoctorAppointments;