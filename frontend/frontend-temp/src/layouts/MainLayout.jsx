import Sidebar from "../components/Sidebar";
import PatientNavbar from "../components/PatientNavbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Navbar */}
        <PatientNavbar />

        {/* Page Content */}
        <main className="p-8 flex-1 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;