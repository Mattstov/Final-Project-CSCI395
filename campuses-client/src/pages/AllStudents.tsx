import { Link } from "react-router-dom";

const students = [
  {
    id: 1,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    gpa: 3.7,
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
    campusId: 1,
    campusName: "Hunter College",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@email.com",
    gpa: 3.9,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
    campusId: null,
    campusName: null,
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Mendez",
    email: "carlos.mendez@email.com",
    gpa: 3.4,
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    campusId: 2,
    campusName: "Baruch College",
  },
];

export default function AllStudents() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Students</h1>

        <Link
          to="/students/new"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Student
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student.id}
            className="border rounded-xl shadow-md overflow-hidden bg-white"
          >
            <img
              src={student.imageUrl}
              alt={`${student.firstName} ${student.lastName}`}
              className="w-full aspect-[3/4] object-cover object-top"
            />

            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">
                {student.firstName} {student.lastName}
              </h2>

              <p className="text-gray-600">{student.email}</p>
              <p className="text-gray-600 mt-1">GPA: {student.gpa.toFixed(1)}</p>

              <p className="mt-3 text-sm">
                Enrolled Campus:{" "}
                {student.campusId ? student.campusName : "Not enrolled"}
              </p>

              <Link
                to={`/students/${student.id}`}
                className="inline-block mt-5 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Student
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}