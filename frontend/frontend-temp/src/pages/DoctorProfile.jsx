import { Link } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

function DoctorProfile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-cyan-400">
          Doctor Profile
        </h1>

        <Link
          to="/doctor"
          className="bg-cyan-500 text-black px-5 py-3 rounded-xl font-bold"
        >
          <ArrowLeft className="inline mr-2" size={18}/>
          Back
        </Link>

      </div>

      <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-10">

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-cyan-500 flex items-center justify-center">

            <User size={60} color="black"/>

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              Dr. Ramesh
            </h2>

            <p className="text-gray-400 mt-2">
              NXD000001
            </p>

            <p className="text-yellow-400 mt-2">
              Cardiology
            </p>

            <p className="text-green-400 mt-2">
              Experience : 10 Years
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorProfile;