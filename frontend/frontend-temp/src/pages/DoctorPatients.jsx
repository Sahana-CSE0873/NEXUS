import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { getQueue } from "../api/queueAPI";

function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getQueue();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.patient_name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold text-cyan-400">
            Today's Patients
          </h1>

          <p className="text-gray-400 mt-2">
            View and manage today's patient queue.
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

      {/* Search */}

      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-4 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search Patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-cyan-600 rounded-xl pl-12 pr-4 py-3 outline-none"
        />

      </div>

      {/* Table */}

      <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-cyan-600">

        <table className="w-full">

          <thead className="bg-cyan-600 text-black">

            <tr>
              <th className="p-4">Queue</th>
              <th className="p-4">Patient ID</th>
              <th className="p-4">Patient Name</th>
              <th className="p-4">Department</th>
              <th className="p-4">Status</th>
            </tr>

          </thead>

          <tbody>

            {filteredPatients.length > 0 ? (

              filteredPatients.map((patient, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-700 text-center hover:bg-slate-800"
                >
                  <td className="p-4">
                    {patient.queue_number}
                  </td>

                  <td className="p-4">
                    {patient.patient_id}
                  </td>

                  <td className="p-4">
                    {patient.patient_name}
                  </td>

                  <td className="p-4">
                    {patient.department}
                  </td>

                  <td className="p-4 text-green-400 font-bold">
                    Waiting
                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-400"
                >
                  No Patients Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DoctorPatients;