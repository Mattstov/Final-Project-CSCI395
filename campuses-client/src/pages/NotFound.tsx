import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="px-2 py-4 flex flex-col items-center justify-center text-center">
      <h1 className="py-4 text-5xl">--404--</h1>
      <h2 className="py-4 text-5xl">Page Not Found :(</h2>
      
      <div className="flex flex-row items-center gap-4 py-4">
        <Link to="/" className="dark:bg-blue-900 bg-blue-600 text-white px-6 py-2 rounded">Go home</Link>
      </div>
    </div>
  )
}