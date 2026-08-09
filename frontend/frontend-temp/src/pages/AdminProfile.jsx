function AdminProfile() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Administrator Profile
      </h1>

      <div className="bg-slate-900 border border-cyan-600 rounded-3xl p-10 max-w-4xl">

        <div className="flex items-center gap-8">

          <div className="w-32 h-32 rounded-full bg-cyan-500 flex items-center justify-center text-5xl font-bold text-black">
            A
          </div>

          <div>

            <h2 className="text-3xl font-bold">
              System Administrator
            </h2>

            <p className="text-gray-400 mt-2">
              Administrator ID
            </p>

            <p className="text-cyan-400 text-xl">
              NXA000001
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-8 mt-10">

          <div>
            <h3 className="text-cyan-400 font-bold mb-2">
              Mobile Number
            </h3>

            <p>9876543210</p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-bold mb-2">
              Email
            </h3>

            <p>admin@nexus.com</p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-bold mb-2">
              Role
            </h3>

            <p>Hospital Administrator</p>
          </div>

          <div>
            <h3 className="text-cyan-400 font-bold mb-2">
              Status
            </h3>

            <p className="text-green-400 font-bold">
              Active
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminProfile;