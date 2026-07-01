import { Link } from "react-router-dom";

export default function EditStudent() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to="/students/1"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to Student
      </Link>

      <div className="bg-white border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">Edit Student</h1>

        <form className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">First Name</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Last Name</label>
            <input
              type="text"
              defaultValue="Smith"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              defaultValue="john.smith@email.com"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              defaultValue="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">GPA</label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.1"
              defaultValue="3.7"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Campus</label>
            <select defaultValue="1" className="w-full border rounded-lg px-4 py-2">
              <option value="">Not enrolled</option>
              <option value="1">Hunter College</option>
              <option value="2">Baruch College</option>
            </select>
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