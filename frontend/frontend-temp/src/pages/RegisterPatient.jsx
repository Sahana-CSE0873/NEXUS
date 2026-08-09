function RegisterPatient() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Register Patient
      </h1>

      <div className="bg-slate-900 border border-cyan-600 rounded-2xl p-8">

        <div className="grid grid-cols-2 gap-6">

          <input
            placeholder="Patient Name"
            className="p-3 rounded-lg bg-slate-800"
          />

          <input
            placeholder="Mobile Number"
            className="p-3 rounded-lg bg-slate-800"
          />

          <input
            placeholder="Age"
            className="p-3 rounded-lg bg-slate-800"
          />

          <select className="p-3 rounded-lg bg-slate-800">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            placeholder="Address"
            className="p-3 rounded-lg bg-slate-800 col-span-2"
          />

        </div>

        <button className="mt-8 bg-cyan-500 text-black px-8 py-3 rounded-xl font-bold">
          Register Patient
        </button>

      </div>

    </div>
  );
}

export default RegisterPatient;