import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AllCampuses from "./pages/AllCampuses";
import AllStudents from "./pages/AllStudents";
import SingleCampus from "./pages/SingleCampus.tsx"; 
import SingleStudent from "./pages/SingleStudent";
import AddCampus from "./pages/AddCampus.tsx";
import AddStudent from "./pages/AddStudent";
import EditCampus from "./pages/EditCampus.tsx";
import EditStudent from "./pages/EditStudent";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/campuses" element={<AllCampuses />} />
        <Route path="/campuses/new" element={<AddCampus />} />
        <Route path="/campuses/:id" element={<SingleCampus />} />
        <Route path="/campuses/:id/edit" element={<EditCampus />} />

        <Route path="/students" element={<AllStudents />} />
        <Route path="/students/new" element={<AddStudent />} />
        <Route path="/students/:id" element={<SingleStudent />} />
        <Route path="/students/:id/edit" element={<EditStudent />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
