import { Link, useParams } from "react-router-dom";

export default function SingleStudent() {
  const { id } = useParams();

  const students = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@myhunter.cuny.edu",
      gpa: 3.7,
      imageUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200",
      campusId: 1,
      campusName: "Hunter College",
      campusAddress: "695 Park Ave, New York, NY",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@gmail.com",
      gpa: 3.9,
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
      campusId: null,
      campusName: null,
      campusAddress: null,
    },
    {
      id: 3,
      firstName: "Carlos",
      lastName: "Mendez",
      email: "carlos.mendez@login.cuny.edu",
      gpa: 3.4,
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
      campusId: 2,
      campusName: "Baruch College",
      campusAddress: "55 Lexington Ave, New York, NY",
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
    <div className="max-w-5xl mx-auto p-8">
      <Link
        to="/students"
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to All Students
      </Link>

      <div className="bg-white border rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={student.imageUrl}
            alt={`${student.firstName} ${student.lastName}`}
            className="w-full md:w-72 aspect-[3/4] object-cover object-top rounded-lg"
          />

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {student.firstName} {student.lastName}
              </h1>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-gray-600 mt-1">GPA: {student.gpa.toFixed(1)}</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                to={`/students/${student.id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Student
              </Link>

              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete Student
              </button>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Enrolled Campus</h2>

          {student.campusId ? (
            <div className="border rounded-lg p-4 flex justify-between items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">{student.campusName}</h3>
                <p className="text-gray-600 text-sm">{student.campusAddress}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/campuses/${student.campusId}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Campus
                </Link>

                <button className="text-red-600 hover:underline">
                  Unenroll Student
                </button>
              </div>
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <p className="text-gray-700">Not enrolled</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}