import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCampus, deleteCampus } from "../api/campuses";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function SingleCampus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: campus, isLoading, isError } = useQuery({
    queryKey: ['campus', id],
    queryFn: () => getCampus(id!),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCampus(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campuses'] });
      navigate("/campuses");
    },
  });

  function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete this campus?");
    if (!confirmed) return;
    deleteMutation.mutate();
  }

  if (isLoading) return <Loading />;

  if (isError || !campus) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <ErrorMessage message="Campus not found." />
        <Link to="/campuses" className="text-blue-600 hover:underline inline-block mt-6">
          ← Back to All Campuses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <Link to="/campuses" className="text-blue-600 hover:underline inline-block mb-6">
        ← Back to All Campuses
      </Link>

      <div className="dark:bg-slate-900 bg-white border rounded-xl shadow-md overflow-hidden">
        <img src={campus.imageUrl} alt={campus.name} className="w-full h-72 object-cover" />

        <div className="p-6">
          <div className="flex justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{campus.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{campus.address}</p>
            </div>

            <div className="flex gap-3">
              <Link
                to={`/campuses/${campus.id}/edit`}
                className="dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Campus
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Campus
              </button>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2">Description</h2>
            <p>{campus.description}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Student enrollment will be connected after Student data is wired up.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}