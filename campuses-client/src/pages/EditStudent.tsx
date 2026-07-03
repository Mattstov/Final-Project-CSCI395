import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampuses } from "../api/campuses";
import { getStudent, updateStudent } from "../api/students";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { toStudentPayload, validateStudentForm, type StudentFormValues } from "../utils/studentValidation";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const studentId = Number(id);

  const [formError, setFormError] = useState("");
  const [values, setValues] = useState<StudentFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    gpa: "",
    campusId: "",
  });

  const {
    data: student,
    isLoading: isStudentLoading,
    isError: isStudentError,
    error: studentError,
  } = useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id!),
    enabled: Boolean(id),
  });

  const {
    data: campuses = [],
    isLoading: isCampusesLoading,
    isError: isCampusesError,
    error: campusesError,
  } = useQuery({
    queryKey: ["campuses"],
    queryFn: getCampuses,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: (payload: ReturnType<typeof toStudentPayload>) =>
      updateStudent(studentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student", id] });
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate(`/students/${studentId}`);
    },
  });

  useEffect(() => {
    if (!student) return;

    setValues({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      imageUrl: student.imageUrl ?? "",
      gpa: String(student.gpa),
      campusId: student.campusId ? String(student.campusId) : "",
    });
  }, [student]);

  if (!id || Number.isNaN(studentId) || studentId < 1) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <ErrorMessage message="Invalid student id." />
      </div>
    );
  }

  function updateField<K extends keyof StudentFormValues>(key: K, value: StudentFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateStudentForm(values);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError("");
    updateMutation.mutate(toStudentPayload(values));
  }

  if (isStudentLoading) return <Loading />;

  if (isStudentError) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <ErrorMessage message={studentError.message || "Failed to load student"} />
        <Link
          to="/students"
          className="text-blue-600 hover:underline inline-block mt-6"
        >
          ← Back to All Students
        </Link>
      </div>
    );
  }

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

        {formError && (
          <p className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-5">
            {formError}
          </p>
        )}

        {updateMutation.isError && (
          <p className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-5">
            {updateMutation.error.message}
          </p>
        )}

        {isCampusesError && (
          <p className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg px-4 py-3 mb-5">
            {campusesError.message || "Campus list could not be loaded."}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2">First Name</label>
            <input
              type="text"
              value={values.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Last Name</label>
            <input
              type="text"
              value={values.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              value={values.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
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
              value={values.gpa}
              onChange={(event) => updateField("gpa", event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Campus</label>
            <select
              value={values.campusId}
              onChange={(event) => updateField("campusId", event.target.value)}
              className="w-full border rounded-lg px-4 py-2"
              disabled={isCampusesLoading || isCampusesError}
            >
              <option value="">Not enrolled</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={String(campus.id)}>
                  {campus.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}