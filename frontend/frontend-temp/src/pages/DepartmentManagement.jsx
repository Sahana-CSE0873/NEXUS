import { useEffect, useState } from "react";
import { getDepartments } from "../api/departmentAPI";

function DepartmentManagement() {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Department Management
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full bg-slate-900 rounded-xl">

          <thead className="bg-cyan-600 text-black">

            <tr>
              <th className="p-4">Department ID</th>
              <th className="p-4">Department Name</th>
            </tr>

          </thead>

          <tbody>

            {departments.map((department) => (

              <tr
                key={department.department_id}
                className="border-b border-slate-700 text-center"
              >

                <td className="p-4">
                  {department.department_id}
                </td>

                <td className="p-4">
                  {department.department_name}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DepartmentManagement;