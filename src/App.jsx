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
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />

        {/* Trang Quản lý Truyện */}
        <Route path="comics" element={<ComicsPage />} />
        <Route path="task" element={<TasksPage />} />
        <Route path="users" element={<UserManagementPage />} />
        {/* Trang Thêm Truyện Mới */}
        <Route path="comics/create" element={<CreateComicPage />} />
        <Route path="comics/edit/:id" element={<CreateComicPage />} />
        <Route path="/admin/comics/:id/chapters" element={<ComiChaptersPage />} />

        <Route path="/admin/comics/:id/chapters/create" element={<CreateEditChapterPage />} />
        <Route path="/admin/comics/:id/chapters/edit/:chapterId" element={<CreateEditChapterPage />} />
      </Route>
    </Routes>
  );
}
