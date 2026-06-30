import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='justify-between flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      
      <footer className="bg-blue-600 text-white px-4 py-2 gap-6">Campuses & Students App</footer>
    </div>
  )
}

export default Layout