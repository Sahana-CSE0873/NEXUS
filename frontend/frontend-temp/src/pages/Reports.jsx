import { useEffect, useState } from "react";
import { getReports } from "../api/adminAPI";

function Reports() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReport(data);
    } catch (error) {
      console.log(error);
      setError("Unable to load reports.");
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold text-cyan-400 mb-4">
          Reports
        </h1>

        <p className="text-red-400">
          {error}
        </p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-cyan-400 text-2xl">
          Loading Reports...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-2">
        Reports
      </h1>

      <p className="text-gray-400 mb-10">
        NEXUS system overview
      </p>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-cyan-400">
            Total Patients
          </h2>

          <p className="text-6xl font-bold mt-6">
            {report.patients}
          </p>
        </div>

        <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-cyan-400">
            Doctors
          </h2>

          <p className="text-6xl font-bold mt-6">
            {report.doctors}
          </p>
        </div>

        <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-cyan-400">
            Receptionists
          </h2>

          <p className="text-6xl font-bold mt-6">
            {report.receptionists}
          </p>
        </div>

        <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-cyan-400">
            Departments
          </h2>

          <p className="text-6xl font-bold mt-6">
            {report.departments}
          </p>
        </div>

      </div>

    </div>
  );
}

export default Reports;