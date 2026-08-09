import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

function DoctorPrescriptions() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            Doctor Prescriptions
          </h1>

          <p className="text-gray-400 mt-2">
            Manage patient prescriptions.
          </p>
        </div>

        <Link
          to="/doctor"
          className="bg-cyan-500 text-black px-5 py-3 rounded-xl font-bold"
        >
          <ArrowLeft className="inline mr-2" size={18} />
          Back
        </Link>

      </div>

      <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-8">

        <div className="flex items-center gap-4 mb-6">

          <FileText className="text-cyan-400" size={40} />

          <div>

            <h2 className="text-2xl font-bold">
              Prescription
            </h2>

            <p className="text-gray-400">
              Patient : Sahana Rudraganti
            </p>

          </div>

        </div>

        <textarea
          rows="10"
          placeholder="Write Prescription..."
          className="w-full bg-slate-800 rounded-xl p-4 outline-none border border-cyan-600"
        />

        <button className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3 rounded-xl">
          Save Prescription
        </button>

      </div>

    </div>
  );
}

export default DoctorPrescriptions;