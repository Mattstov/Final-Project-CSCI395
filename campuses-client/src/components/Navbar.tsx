import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/campuses">Campuses</NavLink>
      <NavLink to="/students">Students</NavLink>
    </nav>
  )
}

export default Navbar