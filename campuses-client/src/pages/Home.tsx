import { Link } from "react-router-dom"

const Home = () => {

  return (

    <div className="px-2 py-4 flex flex-col items-center justify-center text-center">
      <h1 className="py-4 text-5xl">Campus Find</h1>
      <h2 className="py-4">Campus Find is a management app for college campuses and their students!</h2>
      <div className="flex flex-row items-center gap-4 py-4">
        <Link to="/campuses" className="bg-blue-600 text-white px-6 py-2 rounded">Campus</Link>
        <Link to="/students" className="bg-blue-600 text-white px-6 py-2 rounded">Students</Link>
      </div>

    </div>
  )
}

export default Home