import { useState } from "react";

function ReceptionistAppointment() {
  const [form, setForm] = useState({
    patientId: "",
    department: "",
    doctor: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const bookAppointment = (e) => {
    e.preventDefault();

    alert("Appointment Booked Successfully");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Book Appointment
      </h1>

      <form
        onSubmit={bookAppointment}
        className="bg-slate-900 p-8 rounded-2xl border border-cyan-600 max-w-2xl"
      >

        <div className="mb-5">
          <label>Patient ID</label>

          <input
            type="text"
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-slate-800"
          />
        </div>

        <div className="mb-5">
          <label>Department</label>

          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-slate-800"
          >
            <option value="">Select</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Orthopedics</option>
            <option>Dermatology</option>
          </select>
        </div>

        <div className="mb-5">
          <label>Doctor</label>

          <select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-slate-800"
          >
            <option value="">Select</option>
            <option>Dr. Ravi Kumar</option>
            <option>Dr. Sneha</option>
            <option>Dr. Arun</option>
          </select>
        </div>

        <div className="mb-5">
          <label>Appointment Date</label>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-slate-800"
          />
        </div>

        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3 rounded-xl"
        >
          Book Appointment
        </button>

      </form>

    </div>
  );
}

export default ReceptionistAppointment;