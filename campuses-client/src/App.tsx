import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AllCampuses from "./pages/AllCampuses";
import AllStudents from "./pages/AllStudents";
import SingleCampus from "./pages/SingleCampus.tsx"; 
import AddCampus from "./pages/AddCampus.tsx";
import EditCampus from "./pages/EditCampus.tsx";
import useStore from "./store/useStore.ts";
import { useEffect } from "react";

function App() {

  const { darkMode } = useStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/campuses" element={<AllCampuses />} />D
        <Route path="/campuses/new" element={<AddCampus />} />
        <Route path="/campuses/:id" element={<SingleCampus />} />
        <Route path="/campuses/:id/edit" element={<EditCampus />} />

        <Route path="/students" element={<AllStudents />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
