import { Link } from "react-router-dom";

export default function AddStudent() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to="/students"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to All Students
      </Link>

      <div className="bg-white border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">Add Student</h1>

        <form className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">First Name</label>
            <input
              type="text"
              placeholder="Example: John"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Example: Smith"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="john.smith@email.com"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/student.jpg"
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional. A default image will be used if this is left blank.
            </p>
          </div>

          <div>
            <label className="block font-semibold mb-2">GPA</label>
            <input
              type="number"
              min="0"
              max="4"
              step="0.1"
              placeholder="3.5"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Campus</label>
            <select className="w-full border rounded-lg px-4 py-2">
              <option value="">Not enrolled</option>
              <option value="1">Hunter College</option>
              <option value="2">Baruch College</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
}