import { useState } from "react";

export default function UserForm({ user, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    role: user.role || "USER",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(user.id, {
      ...form,
      email: form.email.trim() === "" ? null : form.email,
    });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">✏️ Sửa tài khoản</h3>

      <div className="space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Username"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Email (có thể trống)"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 transition"
        >
          Huỷ
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Lưu
        </button>
      </div>
    </div>
  );
}
