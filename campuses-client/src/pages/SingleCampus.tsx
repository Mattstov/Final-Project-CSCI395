import { Link } from "react-router-dom";

export default function SingleCampus() {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <Link
        to="/campuses"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to All Campuses
      </Link>

      <div className="bg-white border rounded-xl shadow-md overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200"
          alt="Hunter College"
          className="w-full h-72 object-cover"
        />

        <div className="p-6">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Hunter College</h1>
              <p className="text-gray-600">695 Park Ave, New York, NY</p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/campuses/1/edit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Campus
              </Link>

              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete Campus
              </button>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p>
              One of the senior colleges of the City University of New York.
              Hunter College offers many programs and serves students from
              across New York City.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>

            <div className="space-y-3">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">John Smith</h3>
                  <p className="text-gray-600 text-sm">john.smith@email.com</p>
                </div>

                <button className="text-red-600 hover:underline">
                  Remove from campus
                </button>
              </div>

              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Jane Doe</h3>
                  <p className="text-gray-600 text-sm">jane.doe@email.com</p>
                </div>

                <button className="text-red-600 hover:underline">
                  Remove from campus
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
