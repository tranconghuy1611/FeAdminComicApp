import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import LoginPage from "./Page/Login/LoginPage";
import Dashboard from "./Page/Dashboard/Dashboard";
import ComicsPage from "./Page/Comic/Comic";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="comics" element={<ComicsPage />} />
      </Route>
    </Routes>
  );
}
