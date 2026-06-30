import { Link } from "react-router-dom";

export default function EditCampus() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to="/campuses/1"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to Campus
      </Link>

      <div className="bg-white border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">Edit Campus</h1>

        <form className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">Campus Name</label>
            <input
              type="text"
              defaultValue="Hunter College"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Address</label>
            <input
              type="text"
              defaultValue="695 Park Ave, New York, NY"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              defaultValue="https://images.unsplash.com/photo-1562774053-701939374585?w=1200"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              defaultValue="One of the senior colleges of the City University of New York. Hunter College offers many programs and serves students from across New York City."
              className="w-full border rounded-lg px-4 py-2 min-h-32"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
