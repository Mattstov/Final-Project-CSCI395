import { Link } from "react-router-dom";
import useStore from "../store/useStore";

export default function AllCampuses() {
  const campuses = useStore((state) => state.campuses);

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

      {campuses.length === 0 ? (
        <p className="text-gray-600">No campuses have been added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campuses.map((campus) => (
            <div
              key={campus.id}
              className="border rounded-xl shadow-md overflow-hidden dark:bg-slate-900 bg-white"
            >
              <img
                src={campus.imageUrl}
                alt={campus.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{campus.name}</h2>

                <p className="text-gray-600 dark:text-gray-300">
                  {campus.address}
                </p>

                <p className="mt-3 text-sm">{campus.description}</p>

                <Link
                  to={`/campuses/${campus.id}`}
                  className="inline-block mt-5 dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Campus
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
