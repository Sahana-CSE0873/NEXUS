import { useEffect, useState } from "react";
import { getPatients } from "../api/patientAPI";

function ReceptionistPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Patient Records
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

          <thead className="bg-cyan-600 text-black">

            <tr>
              <th className="p-4">Patient ID</th>
              <th className="p-4">Patient Name</th>
              <th className="p-4">Mobile Number</th>
            </tr>

          </thead>

          <tbody>

            {patients.map((patient) => (

              <tr
                key={patient.patient_id}
                className="border-b border-slate-700 text-center"
              >

                <td className="p-4">{patient.patient_id}</td>

                <td className="p-4">{patient.patient_name}</td>

                <td className="p-4">{patient.mobile_number}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReceptionistPatients;