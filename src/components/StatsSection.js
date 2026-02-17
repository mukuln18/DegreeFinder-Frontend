export default function StatsSection() {
  return (
    <section className="w-full py-16 bg-gray-90 border-y">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">

        <div>
          <h3 className="text-3xl font-bold">5+</h3>
          <p className="text-gray-500">Colleges Listed</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">100+</h3>
          <p className="text-gray-500">Students Helped</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold">95%</h3>
          <p className="text-gray-500">Accurate Placement Data</p>
        </div>

      </div>
    </section>
  );
}
