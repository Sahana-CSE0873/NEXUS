import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorAPI";

function DoctorManagement() {

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Doctor Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-900 rounded-xl">

          <thead className="bg-cyan-600 text-black">

            <tr>
              <th className="p-4">Doctor ID</th>
              <th className="p-4">Doctor Name</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Mobile</th>
            </tr>

          </thead>

          <tbody>

            {doctors.map((doctor) => (

              <tr
                key={doctor.doctor_id}
                className="border-b border-slate-700 text-center"
              >

                <td className="p-4">{doctor.doctor_id}</td>

                <td className="p-4">{doctor.doctor_name}</td>

                <td className="p-4">{doctor.specialization}</td>

                <td className="p-4">{doctor.mobile_number}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DoctorManagement;