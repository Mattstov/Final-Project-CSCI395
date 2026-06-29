import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <footer>Campuses & Students App</footer>
    </div>
  )
}

export default Layout