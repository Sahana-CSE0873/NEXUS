import { useEffect, useState } from "react";
import { getReceptionists } from "../api/receptionistAPI";

function ReceptionistManagement() {

  const [receptionists, setReceptionists] = useState([]);

  useEffect(() => {
    loadReceptionists();
  }, []);

  const loadReceptionists = async () => {
    try {
      const data = await getReceptionists();
      setReceptionists(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Receptionist Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-900 rounded-xl">

          <thead className="bg-cyan-600 text-black">

            <tr>
              <th className="p-4">Receptionist ID</th>
              <th className="p-4">Receptionist Name</th>
              <th className="p-4">Mobile Number</th>
            </tr>

          </thead>

          <tbody>

            {receptionists.map((item) => (

              <tr
                key={item.receptionist_id}
                className="border-b border-slate-700 text-center"
              >

                <td className="p-4">
                  {item.receptionist_id}
                </td>

                <td className="p-4">
                  {item.receptionist_name}
                </td>

                <td className="p-4">
                  {item.mobile_number}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ReceptionistManagement;