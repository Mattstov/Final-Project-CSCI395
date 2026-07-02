import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useStore from "../store/useStore";
import ErrorMessage from "../components/ErrorMessage";

export default function EditCampus() {
  const { id } = useParams();
  const navigate = useNavigate();

  const campusId = Number(id);
  const campus = useStore((state) => state.getCampusById(campusId));
  const updateCampus = useStore((state) => state.updateCampus);

  const [name, setName] = useState(campus?.name || "");
  const [address, setAddress] = useState(campus?.address || "");
  const [imageUrl, setImageUrl] = useState(campus?.imageUrl || "");
  const [description, setDescription] = useState(campus?.description || "");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !address.trim() || !description.trim()) {
      setError("Campus name, address, and description are required.");
      return;
    }

    updateCampus(campusId, {
      name: name.trim(),
      address: address.trim(),
      imageUrl: imageUrl.trim(),
      description: description.trim(),
    });

    setError("");
    navigate(`/campuses/${campusId}`);
  }

  if (!campus) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <ErrorMessage message="Campus not found." />

        <Link
          to="/campuses"
          className="text-blue-600 hover:underline inline-block mt-6"
        >
          ← Back to All Campuses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <Link
        to={`/campuses/${campus.id}`}
        className="text-blue-600 hover:underline inline-block mb-6"
      >
        ← Back to Campus
      </Link>

      <div className="dark:bg-slate-900 bg-white border rounded-xl shadow-md p-6">
        <h1 className="text-4xl font-bold mb-6">Edit Campus</h1>

        {error && (
          <p className="bg-red-100 text-red-700 border border-red-300 rounded-lg px-4 py-3 mb-5">
            {error}
          </p>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block font-semibold mb-2">Campus Name</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Address</label>
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full border rounded-lg px-4 py-2 min-h-32 dark:bg-slate-800"
            />
          </div>

          <button
            type="submit"
            className="dark:bg-blue-900 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 hover:dark:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
