import { useEffect, useMemo, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../api/userService";
import UserForm from "./UserForm";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("ALL");
  const [sort, setSort] = useState("DESC");

  useEffect(() => {
    getAllUsers().then(res => setUsers(res.data));
  }, []);

  const filteredUsers = useMemo(() => {
    return users
      .filter(u => {
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

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <div className="text-sm text-slate-400 mb-1">
          Dashboard / <span className="text-slate-600">Người dùng</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Quản lý Tài khoản
        </h1>
        <p className="text-slate-500">
          Quản lý, phân quyền và theo dõi trạng thái người dùng
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 mb-4">
        <input
          placeholder="Tìm theo tên hoặc email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="ALL">Tất cả vai trò</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="DESC">Mới nhất</option>
          <option value="ASC">Cũ nhất</option>
        </select>

        <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          + Thêm người dùng
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr className="text-slate-500">
              <th className="px-4 py-3 text-left">Người dùng</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Ngày đăng ký</th>
              <th className="px-4 py-3 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-slate-50">
                <td className="px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-semibold text-slate-600">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{user.username}</div>
                    <div className="text-xs text-slate-400">
                      {user.email ?? "—"}
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${
                        user.role === "ADMIN"
                          ? "bg-purple-100 text-purple-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-4 py-3 text-slate-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3 text-center space-x-3">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-400">
                  Không có người dùng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-[420px] p-6">
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
    </div>
  );
}
