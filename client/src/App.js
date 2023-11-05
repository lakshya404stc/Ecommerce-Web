import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import Pagenotfound from "./pages/Pagenotfound";
import About from "./pages/About";
import Register from "./pages/auth/Register";
import Login1 from "./pages/auth/Login1";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import Forgetpassword from "./pages/auth/Forgetpassword";
import Admindashboard from "./pages/admin/Admindashboard";
import Admin from "./components/Routes/Admin";
import Createcategory from "./pages/admin/Createcategory";
import Createproduct from "./pages/admin/Createproduct";
import Displayusers from "./pages/admin/Displayusers";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path="user" element={<Dashboard />} />
      </Route>
      <Route path="/dashboard" element={<Admin/>}>
           <Route path="admin" element={<Admindashboard />} />
           <Route path="admin/create-category" element={<Createcategory />} />
           <Route path="admin/create-product" element={<Createproduct />} />
           <Route path="admin/display-users" element={<Displayusers />} />
      </Route>
      <Route path="/login" element={<Login1 />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
    </Routes>
  );
}

export default App;
