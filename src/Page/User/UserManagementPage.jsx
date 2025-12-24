import { useEffect, useMemo, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "../../api/userService";
import UserForm from "./UserForm";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  // filter state
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("ALL");
  const [sort, setSort] = useState("DESC");

  const loadUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Xoá tài khoản này?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  // 🔎 FILTER + SORT
  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const matchKeyword =
          u.username.toLowerCase().includes(keyword.toLowerCase()) ||
          (u.email ?? "").toLowerCase().includes(keyword.toLowerCase());

        const matchRole = role === "ALL" || u.role === role;
        return matchKeyword && matchRole;
      })
      .sort((a, b) =>
        sort === "DESC"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
  }, [users, keyword, role, sort]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">User Management</h1>

      {/* FILTER BAR */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search username / email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="ALL">All roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="DESC">Newest</option>
          <option value="ASC">Oldest</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3 font-medium">{user.username}</td>
                <td className="px-4 py-3 text-slate-500">
                  {user.email ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-1 rounded bg-slate-200">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-slate-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[420px] p-5 shadow-lg">
            <UserForm
              user={editingUser}
              onSubmit={async (id, data) => {
                await updateUser(id, data);
                setEditingUser(null);
                loadUsers();
              }}
              onCancel={() => setEditingUser(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
