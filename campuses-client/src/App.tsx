import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import AllCampuses from './pages/AllCampuses'
import AllStudents from './pages/AllStudents'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campuses" element={<AllCampuses />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}


export default App
