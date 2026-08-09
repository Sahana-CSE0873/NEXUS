import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-12 py-6 bg-slate-900/80 backdrop-blur-md border-b border-cyan-700">
      <h1 className="text-3xl font-bold text-cyan-400">
        NEXUS
      </h1>

      <div className="flex gap-10 text-white text-lg">
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <Link
        to="/login"
        className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-2 rounded-xl transition"
      >
        Login
      </Link>
    </nav>
  );
}

export default Navbar;