import { NavLink } from 'react-router-dom'
import useStore from '../store/useStore'

const Navbar = () => {

  const navLinkClass = (({ isActive }: {isActive: boolean}) => `px-3 py-1 rounded ${isActive ? 'font-bold underline' : 'opacity-75 hover:opacity-100'}`)
  const {darkMode, toggleDarkMode} = useStore()
  return (
    <nav className="dark:bg-blue-900 bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
    <span className="font-bold text-xl">CampusFind</span>
    <div className="flex gap-6">
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/campuses" className={navLinkClass}>Campuses</NavLink>
      <NavLink to="/students" className={navLinkClass}>Students</NavLink>
      <button onClick={toggleDarkMode}>
        {darkMode ? '🌙' : '☀️'}
      </button>
    </div>
  </nav>
  )
}

export default Navbar