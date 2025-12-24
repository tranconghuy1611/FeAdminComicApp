import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";

import LoginPage from "./Page/Login/LoginPage";
import Dashboard from "./Page/Dashboard/Dashboard";
import ComicsPage from "./Page/Comic/Comic";
import CreateEditChapterPage from "./Page/Chapter/CreateEditChapterPage";
import ComiChaptersPage from "./Page/Chapter/ComicChaptersPage";
import CreateComicPage from "./Page/Comic/CreateComicPage";
import TasksPage from "./Page/Tasks/TasksPage";
import UserManagementPage from "./Page/User/UserManagementPage";
import ForbiddenPage from "./Page/Error/ForbiddenPage";
import AdminRoute from "./routes/AdminRoute";
export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage />} />

      {/* 403 */}
      <Route path="*" element={<ForbiddenPage />} />

      {/* ADMIN (Protected) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="comics" element={<ComicsPage />} />
          <Route path="task" element={<TasksPage />} />
          <Route path="users" element={<UserManagementPage />} />

          <Route path="comics/create" element={<CreateComicPage />} />
          <Route path="comics/edit/:id" element={<CreateComicPage />} />

          <Route path="comics/:id/chapters" element={<ComiChaptersPage />} />
          <Route path="comics/:id/chapters/create" element={<CreateEditChapterPage />} />
          <Route
            path="comics/:id/chapters/edit/:chapterId"
            element={<CreateEditChapterPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
