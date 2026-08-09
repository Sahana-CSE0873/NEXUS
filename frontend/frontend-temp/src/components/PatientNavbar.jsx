import { Bell, Search } from "lucide-react";

function PatientNavbar() {
  return (
    <div className="h-20 bg-slate-900 border-b border-cyan-700 px-8 flex items-center justify-between shadow-lg">

      {/* Left */}
      <div>

        <h1 className="text-3xl font-bold text-cyan-400">
          Patient Dashboard
        </h1>

        <p className="text-gray-400">
          Welcome to NEXUS Smart Patient Journey
        </p>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search Box */}
        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-800 border border-cyan-600 rounded-xl pl-12 pr-4 py-3 text-white outline-none w-72"
          />

        </div>

        {/* Notification */}
        <button className="relative">

          <Bell
            className="text-yellow-400"
            size={24}
          />

          <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-[10px] flex items-center justify-center text-white">
            3
          </span>

        </button>

        {/* Profile */}
        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-2xl">
            P
          </div>

          <div>

            <h2 className="font-bold">
              Patient
            </h2>

            <p className="text-gray-400 text-sm">
              NXP000001
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PatientNavbar;