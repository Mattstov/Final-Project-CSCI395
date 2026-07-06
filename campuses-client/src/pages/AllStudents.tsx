import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../api/students";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import useStore from "../store/useStore";

const fallbackStudentImage =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800";

export default function AllStudents() {
  const { studentSearchTerm, setStudentSearchTerm } = useStore();

  const {
    data: students = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message={error.message || "Failed to load students"} />;

  const filteredStudents = students.filter((student) => {
    const term = studentSearchTerm.trim().toLowerCase();
    if (!term) return true;

    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return fullName.includes(term) || student.email.toLowerCase().includes(term);
  });

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">All Students</h1>

        <Link
          to="/students/new"
          className="dark:bg-blue-900 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Student
        </Link>
      </div>

      <div className="mb-6">
        <label htmlFor="student-search" className="block font-semibold mb-2">
          Filter Students
        </label>
        <input
          id="student-search"
          type="text"
          value={studentSearchTerm}
          onChange={(event) => setStudentSearchTerm(event.target.value)}
          placeholder="Search by name or email"
          className="w-full max-w-md border rounded-lg px-4 py-2 dark:bg-slate-800"
        />
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-gray-600">
          {students.length === 0
            ? "No students have been added yet."
            : "No students match your current filter."}
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="border rounded-xl shadow-md overflow-hidden dark:bg-slate-900 bg-white"
            >
              <img
                src={student.imageUrl || fallbackStudentImage}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-full aspect-[3/4] object-cover object-top"
              />

              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">
                  {student.firstName} {student.lastName}
                </h2>

                <p className="text-gray-600 dark:text-gray-300">{student.email}</p>
                <p className="text-gray-600 dark:text-gray-300 mt-1">GPA: {student.gpa.toFixed(1)}</p>

                <p className="mt-3 text-sm">
                  Enrolled Campus: {student.campus?.name ?? "Not enrolled"}
                </p>

                <Link
                  to={`/students/${student.id}`}
                  className="inline-block mt-5 dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Student
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}