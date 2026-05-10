import { NavLink, Route, Routes } from "react-router-dom";
import ApiTesterPage from "./pages/ApiTesterPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <div className="container">
      <h1>Task1 React Frontend</h1>
      <nav className="nav">
        <NavLink to="/" end>
          API Tester
        </NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<ApiTesterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}
