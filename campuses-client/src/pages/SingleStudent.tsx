import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteStudent, getStudent, updateStudent } from "../api/students";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const fallbackStudentImage =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=1200";

export default function SingleStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const studentId = Number(id);

  const {
    data: student,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id!),
    enabled: Boolean(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteStudent(studentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
  });

  const unenrollMutation = useMutation({
    mutationFn: () =>
      updateStudent(studentId, {
        firstName: student!.firstName,
        lastName: student!.lastName,
        email: student!.email,
        imageUrl: student!.imageUrl ?? "",
        gpa: student!.gpa,
        campusId: null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", id] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  if (!id || Number.isNaN(studentId) || studentId < 1) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <ErrorMessage message="Invalid student id." />
      </div>
    );
  }

  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;
    deleteMutation.mutate();
  }

  function handleUnenroll() {
    if (!student || !student.campusId) return;
    unenrollMutation.mutate();
  }

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="max-w-3xl mx-auto p-8">
        <ErrorMessage message={error.message || "Failed to load student"} />
      </div>
    );

  if (!student) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Link
          to="/students"
          className="text-blue-600 hover:underline inline-block mb-6"
        >
          ← Back to All Students
        </Link>

        <div className="dark:bg-slate-900 bg-white border rounded-xl shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">Student not found</h1>
          <p className="text-gray-600 dark:text-gray-300">
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
        className="text-blue-600 dark:text-blue-400 hover:underline inline-block mb-6"
      >
        ← Back to All Students
      </Link>

      <div className="bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <img
            src={student.imageUrl || fallbackStudentImage}
            alt={`${student.firstName} ${student.lastName}`}
            className="w-full md:w-72 aspect-[3/4] object-cover object-top rounded-lg"
          />

          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {student.firstName} {student.lastName}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{student.email}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-1">GPA: {student.gpa.toFixed(1)}</p>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                to={`/students/${student.id}/edit`}
                className="dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Student
              </Link>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Enrolled Campus</h2>

          {student.campusId ? (
            <div className="dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-4 flex justify-between items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">{student.campus?.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{student.campus?.address}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/campuses/${student.campusId}`}
                  className="dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Campus
                </Link>

                <button
                  onClick={handleUnenroll}
                  className="text-red-600 dark:text-red-400 hover:underline"
                >
                  Unenroll Student
                </button>
              </div>
            </div>
          ) : (
            <div className="dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">Not enrolled</p>
            </div>
          )}
        </section>

        {(deleteMutation.isError || unenrollMutation.isError) && (
          <p className="mt-4 bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3">
            {deleteMutation.error?.message || unenrollMutation.error?.message || "Action failed."}
          </p>
        )}
      </div>
    </div>
  );
}