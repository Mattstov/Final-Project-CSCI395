import { Link, useParams } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();

  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@myhunter.cuny.edu",
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200",
      gpa: 3.7,
      campusId: 1,
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@gmail.com",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
      gpa: 3.9,
      campusId: null,
    },
    {
      id: 3,
      firstName: "Carlos",
      lastName: "Mendez",
      email: "carlos.mendez@login.cuny.edu",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
      gpa: 3.4,
      campusId: 2,
    },
  ];

  const studentId = Number(id);
  const student = students.find((item) => item.id === studentId);

  if (!student) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Link
          to="/students"
          className="text-blue-600 hover:underline inline-block mb-6"
        >
          ← Back to All Students
        </Link>

        <div className="bg-white border rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">Student not found</h1>
          <p className="text-gray-600">
            This student record does not exist in the current data set.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to={`/students/${student.id}`}
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to Student
      </Link>

      <div className="bg-white border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">
          Edit Student: {student.firstName} {student.lastName}
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block font-semibold mb-2">First Name</label>
            <input
              type="text"
              defaultValue={student.firstName}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Last Name</label>
            <input
              type="text"
              defaultValue={student.lastName}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              defaultValue={student.email}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              defaultValue={student.imageUrl}
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
              defaultValue={student.gpa}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Campus</label>
            <select
              defaultValue={student.campusId ?? ""}
              className="w-full border rounded-lg px-4 py-2"
            >
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