import { useEffect, useMemo, useState } from "react";
import {
  PlusIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  PencilSquareIcon,
  TrashIcon,
  UserCircleIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

import { getAllUsers, deleteUser, updateUser } from "../../api/userService";
import UserForm from "./UserForm";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("ALL");
  const [sort, setSort] = useState("DESC");

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data));
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const k =
          u.username.toLowerCase().includes(keyword.toLowerCase()) ||
          (u.email ?? "").toLowerCase().includes(keyword.toLowerCase());
        const r = role === "ALL" || u.role === role;
        return k && r;
      })
      .sort((a, b) =>
        sort === "DESC"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
  }, [users, keyword, role, sort]);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setDeletingUser(null);
    getAllUsers().then((res) => setUsers(res.data));
  };

  const stats = useMemo(() => ({
    total: users.length,
    admins: users.filter(u => u.role === "ADMIN").length,
    users: users.filter(u => u.role === "USER").length,
  }), [users]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 p-6">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>Dashboard</span> / <span className="text-blue-600 font-semibold">Người dùng</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Quản lý Tài khoản
        </h1>
        <p className="text-gray-600">
          Quản lý, phân quyền và theo dõi trạng thái người dùng trong hệ thống
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Tổng người dùng</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <UserCircleIcon className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Quản trị viên</p>
              <p className="text-3xl font-bold text-purple-600">{stats.admins}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <ShieldCheckIcon className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Người dùng</p>
              <p className="text-3xl font-bold text-emerald-600">{stats.users}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <CheckBadgeIcon className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[280px] relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div className="relative">
          <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white font-medium transition-all cursor-pointer"
          >
            <option value="ALL">Tất cả vai trò</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white font-medium transition-all cursor-pointer"
        >
          <option value="DESC">Mới nhất</option>
          <option value="ASC">Cũ nhất</option>
        </select>

        <button
          onClick={() => getAllUsers().then(res => setUsers(res.data))}
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-3 rounded-xl transition-all"
        >
          <ArrowPathIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Người dùng</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Vai trò</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Ngày đăng ký</th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-md group-hover:scale-110 transition-transform">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-base">{user.username}</div>
                    <div className="text-sm text-gray-500">{user.email ?? "Chưa có email"}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                    user.role === "ADMIN"
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                      : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                  }`}>
                    {user.role === "ADMIN" ? <ShieldCheckIcon className="w-4 h-4" /> : <UserCircleIcon className="w-4 h-4" />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-gray-600 font-medium">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all shadow-sm hover:shadow-md"
                    >
                      <PencilSquareIcon className="w-4 h-4" />
                      Sửa
                    </button>
                    {/* <button
                      onClick={() => setDeletingUser(user)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all shadow-sm hover:shadow-md"
                    >
                      <TrashIcon className="w-4 h-4" />
                      Xóa
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="py-16 text-center text-gray-400">
                  Không tìm thấy người dùng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL EDIT */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
            <UserForm
              user={editingUser}
              onSubmit={async (id, data) => {
                await updateUser(id, data);
                setEditingUser(null);
                getAllUsers().then(res => setUsers(res.data));
              }}
              onCancel={() => setEditingUser(null)}
            />
          </div>
        </div>
      )}

      {/* MODAL DELETE */}
    </div>
  );
}
