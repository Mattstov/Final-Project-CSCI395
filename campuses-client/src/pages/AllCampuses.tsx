import { Link } from "react-router-dom";

export default function AllCampuses() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Campuses</h1>

        <Link
          to="/campuses/new"
          className="dark:bg-blue-900 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Campus
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="border rounded-xl shadow-md overflow-hidden dark:bg-slate-900 bg-white">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=800"
            alt="Hunter College"
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">Hunter College</h2>

            <p className="text-gray-600">695 Park Ave, New York, NY</p>

            <p className="mt-3 text-sm">
              One of the senior colleges of the City University of New York.
            </p>

            <Link
              to="/campuses/1"
              className="inline-block mt-5 dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
