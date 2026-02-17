"use client";

export default function HeroSection() {

  const scrollToColleges = () => {
    const section = document.getElementById("colleges-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white border-b">
      <div className="max-w-4xl text-center px-6">

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Discover and Compare Top Colleges
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Explore colleges, compare fees, placement statistics, and rankings
          to make informed academic decisions with confidence.
        </p>

        <button
          onClick={scrollToColleges}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Explore Colleges
        </button>

      </div>
    </section>
  );
}
