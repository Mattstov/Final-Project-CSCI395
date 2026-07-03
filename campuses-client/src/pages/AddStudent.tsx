import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCampuses } from "../api/campuses";
import { createStudent } from "../api/students";
import { toStudentPayload, validateStudentForm, type StudentFormValues } from "../utils/studentValidation";

export default function AddStudent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
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
    data: campuses = [],
    isLoading: isCampusesLoading,
    isError: isCampusesError,
    error: campusesError,
  } = useQuery({
    queryKey: ["campuses"],
    queryFn: getCampuses,
    retry: false,
  });

  const createMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      navigate("/students");
    },
  });

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
    createMutation.mutate(toStudentPayload(values));
  }

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

        {isCampusesError && (
          <p className="bg-yellow-100 text-yellow-800 border border-yellow-300 rounded-lg px-4 py-3 mb-5">
            {campusesError.message || "Campus list is unavailable. You can still create an unenrolled student."}
          </p>
        )}

        {formError && (
          <p className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-5">
            {formError}
          </p>
        )}

        {createMutation.isError && (
          <p className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-5">
            {createMutation.error.message}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2">First Name</label>
            <input
              type="text"
              value={values.firstName}
              onChange={(event) => updateField("firstName", event.target.value)}
              placeholder="Example: John"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Last Name</label>
            <input
              type="text"
              value={values.lastName}
              onChange={(event) => updateField("lastName", event.target.value)}
              placeholder="Example: Smith"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="john.smith@email.com"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              value={values.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
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
              value={values.gpa}
              onChange={(event) => updateField("gpa", event.target.value)}
              placeholder="3.5"
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
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? "Creating..." : "Create Student"}
          </button>
        </form>
      </div>
    </div>
  );
}