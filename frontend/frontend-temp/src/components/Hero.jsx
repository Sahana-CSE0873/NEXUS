import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-[85vh] px-8">

      <h1 className="text-7xl font-bold text-white">
        Smart Patient
      </h1>

      <h1 className="text-7xl font-bold text-cyan-400 mt-2">
        Journey
      </h1>

      <p className="text-gray-300 mt-8 max-w-3xl text-xl leading-9">
        AI-powered hospital management platform with intelligent queue
        optimization, digital check-in, online prescriptions,
        smart billing, and seamless patient care.
      </p>

      <div className="mt-12 flex gap-6">

        <Link
          to="/login"
          className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400 transition"
        >
          Get Started
        </Link>

        <button
          className="border border-cyan-500 text-cyan-400 px-8 py-4 rounded-xl hover:bg-cyan-500 hover:text-black transition"
        >
          Learn More
        </button>

      </div>

    </section>
  );
}

export default Hero;