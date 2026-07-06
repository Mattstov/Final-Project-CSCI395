export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL?.trim() || "https://final-project-server-csci395.onrender.com"
).replace(/\/$/, "");
