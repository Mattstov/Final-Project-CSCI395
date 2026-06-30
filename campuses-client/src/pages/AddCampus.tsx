import { Link } from "react-router-dom";

export default function AddCampus() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to="/campuses"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to All Campuses
      </Link>

      <div className="bg-white border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">Add Campus</h1>

        <form className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">Campus Name</label>
            <input
              type="text"
              placeholder="Example: Hunter College"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Address</label>
            <input
              type="text"
              placeholder="Example: 695 Park Ave, New York, NY"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/campus.jpg"
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional. A default image will be used if this is left blank.
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              placeholder="Write a short campus description..."
              className="w-full border rounded-lg px-4 py-2 min-h-32"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Campus
          </button>
        </form>
      </div>
    </div>
  );
}
