import { useEffect, useState } from "react";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/taskService"; // 👈 Import từ file riêng
import { useNavigate } from "react-router-dom";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pointsReward: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await getAllTasks(); // 👈 Dùng hàm từ service
      setTasks(res.data);
    } catch (err) {
      alert("Không tải được danh sách nhiệm vụ!");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await createTask(formData); // 👈 Dùng service
      alert("Tạo nhiệm vụ thành công!");
      setShowCreateModal(false);
      resetForm();
      loadTasks();
    } catch (err) {
      alert("Tạo nhiệm vụ thất bại!");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateTask(currentTask.id, formData); // 👈 Dùng service
      alert("Cập nhật nhiệm vụ thành công!");
      setShowEditModal(false);
      resetForm();
      loadTasks();
    } catch (err) {
      alert("Cập nhật thất bại!");
    }
  };

  // const handleDelete = async () => {
  //   try {
  //     await deleteTask(currentTask.id); // 👈 Dùng service
  //     alert("Xóa nhiệm vụ thành công!");
  //     setShowDeleteModal(false);
  //     setCurrentTask(null);
  //     loadTasks();
  //   } catch (err) {
  //     alert("Xóa thất bại!");
  //   }
  // };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setFormData({
      name: task.name,
      description: task.description,
      pointsReward: task.pointsReward,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (task) => {
    setCurrentTask(task);
    setShowDeleteModal(true);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", pointsReward: 0 });
  };

  // ... phần return giữ nguyên như trước (giao diện không đổi)
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 text-xl text-gray-600 dark:text-gray-400">
        Đang tải danh sách nhiệm vụ...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-black text-[#111418] dark:text-white">
            Quản Lý Nhiệm Vụ
          </h1>
          <p className="mt-2 text-base text-[#617589] dark:text-[#94A3B8]">
            Tạo và quản lý các nhiệm vụ để người dùng kiếm điểm
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#137fec] to-blue-600 px-6 py-4 font-bold text-white shadow-lg hover:shadow-xl transition-all"
        >
          <span className="material-symbols-outlined text-xl">add_task</span>
          Tạo Nhiệm Vụ Mới
        </button>
      </div>

      {/* Bảng nhiệm vụ */}
      {tasks.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Chưa có nhiệm vụ nào. Hãy tạo nhiệm vụ đầu tiên!
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[#dbe0e6] bg-white shadow-sm dark:bg-[#1A2633] dark:border-[#2A3B4D]">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-[#dbe0e6] bg-[#f8f9fa] dark:bg-[#23303E] dark:border-[#2A3B4D]">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                    ID
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                    Tên nhiệm vụ
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                    Mô tả
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                    Phần thưởng
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8] text-right">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#2A3B4D]">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-[#fcfdfd] dark:hover:bg-[#1F2C3A] transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">#{task.id}</td>
                    <td className="px-6 py-4 font-semibold text-[#111418] dark:text-white">{task.name}</td>
                    <td className="px-6 py-4 text-sm text-[#617589] dark:text-[#94A3B8]">
                      {task.description || "Không có mô tả"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1.5 text-sm font-bold text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                        <span className="material-symbols-outlined text-base">stars</span>
                        {task.pointsReward} điểm
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditModal(task)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                          title="Sửa"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        {/* <button
                          onClick={() => openDeleteModal(task)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tạo / Sửa Nhiệm Vụ */}
      {(showCreateModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
              resetForm();
            }}
          />
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#1A2633] p-8 shadow-2xl">
            <h2 className="mb-6 text-2xl font-bold text-[#111418] dark:text-white">
              {showCreateModal ? "Tạo Nhiệm Vụ Mới" : "Sửa Nhiệm Vụ"}
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                  Tên nhiệm vụ
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#2A3B4D] bg-white dark:bg-[#23303E] px-4 py-3 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]"
                  placeholder="VD: Đọc 1 truyện hoàn chỉnh"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                  Mô tả
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#2A3B4D] bg-white dark:bg-[#23303E] px-4 py-3 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]"
                  placeholder="Mô tả chi tiết nhiệm vụ..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#111418] dark:text-white mb-2">
                  Phần thưởng (điểm)
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.pointsReward}
                  onChange={(e) => setFormData({ ...formData, pointsReward: Number(e.target.value) })}
                  className="w-full rounded-lg border border-[#dbe0e6] dark:border-[#2A3B4D] bg-white dark:bg-[#23303E] px-4 py-3 text-[#111418] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#137fec]"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowEditModal(false);
                  resetForm();
                }}
                className="rounded-xl border border-[#dbe0e6] dark:border-[#2A3B4D] px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-[#2A3B4D] transition"
              >
                Hủy
              </button>
              <button
                onClick={showCreateModal ? handleCreate : handleUpdate}
                className="rounded-xl bg-gradient-to-r from-[#137fec] to-blue-600 px-7 py-3 font-bold text-white shadow-lg hover:shadow-xl transition"
              >
                {showCreateModal ? "Tạo Nhiệm Vụ" : "Lưu Thay Đổi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xóa */}
    </div>
  );
}