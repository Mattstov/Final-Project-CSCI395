import Navbar from './Navbar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='dark:bg-slate-900 dark:text-white flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      
      <footer className="dark:bg-blue-900 bg-blue-600 text-white px-4 py-2 gap-6">Campuses & Students App</footer>
    </div>
  )
}

export default Layout