import { NavLink } from 'react-router-dom'

const Navbar = () => {

  const navLinkClass = (({ isActive }: {isActive: boolean}) => `px-3 py-1 rounded ${isActive ? 'font-bold underline' : 'opacity-75 hover:opacity-100'}`)

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6">
      <NavLink to="/" className={navLinkClass}>Home</NavLink>
      <NavLink to="/campuses" className={navLinkClass}>Campuses</NavLink>
      <NavLink to="/students" className={navLinkClass}>Students</NavLink>
    </nav>
  )
}

export default Navbar