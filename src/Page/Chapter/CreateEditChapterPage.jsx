import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createChapter, updateChapter, getChapterById } from "../../api/chapterService";

export default function CreateEditChapterPage() {
  const { id: storyId, chapterId } = useParams(); // storyId và chapterId (nếu có)
  const navigate = useNavigate();
  const isEditMode = !!chapterId;

  const [form, setForm] = useState({
    title: "",
    chapterNumber: "",
    description: "",
    content: "",
    isLocked: false,
    storyId: Number(storyId),
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  // Load dữ liệu chương khi ở chế độ sửa
  useEffect(() => {
    if (isEditMode) {
      loadChapter();
    }
  }, [chapterId]);

  const loadChapter = async () => {
    try {
      const res = await getChapterById(chapterId);
      const chapter = res.data;
      setForm({
        title: chapter.title || "",
        chapterNumber: chapter.chapterNumber || "",
        description: chapter.description || "",
        content: chapter.content || "",
        isLocked: chapter.isLocked || false,
        storyId: Number(storyId),
      });
    } catch (err) {
      alert("Không tải được thông tin chương!");
      navigate(`/admin/comics/${storyId}/chapters`);
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await updateChapter(chapterId, form);
        alert("Cập nhật chương thành công!");
      } else {
        await createChapter(form);
        alert("Thêm chương thành công!");
      }
      navigate(`/admin/comics/${storyId}/chapters`);
    } catch (err) {
      alert(err.response?.data?.message || "Lưu chương thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Đang tải thông tin chương...
        </div>
      </div>
    );
  }

 return (
  <div className="mx-auto max-w-5xl p-8 bg-white dark:bg-[#0f172a] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
    {/* Header */}
    <div className="mb-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
        📘 {isEditMode ? "Chỉnh sửa Chương" : "Thêm Chương Mới"}
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Quản lý nội dung chương truyện, số chương, nội dung và quyền truy cập.
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Grid 2 cột */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Số chương */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Số chương <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="chapterNumber"
            value={form.chapterNumber}
            onChange={handleChange}
            required
            min="1"
            className="w-full rounded-xl bg-gray-100 dark:bg-[#1e293b] px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Tiêu đề */}
        <div>
          <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
            Tiêu đề chương <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Chương 1: Khởi đầu"
            className="w-full rounded-xl bg-gray-100 dark:bg-[#1e293b] px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Mô tả */}
      <div>
        <label className="block mb-1 font-semibold text-gray-800 dark:text-gray-200">
          Mô tả ngắn
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="3"
          placeholder="Tóm tắt ngắn nội dung chương..."
          className="w-full rounded-xl bg-gray-100 dark:bg-[#1e293b] px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Nội dung */}
      <div>
        <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200">
          Nội dung chương <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="14"
            required
            placeholder="Viết nội dung chương tại đây..."
            className="w-full rounded-2xl bg-gray-100 dark:bg-[#020617] px-5 py-4 font-mono text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="absolute bottom-3 right-4 text-xs text-gray-500">
            {form.content.length} ký tự
          </span>
        </div>
      </div>

      {/* Khóa chương */}
      <div className="flex items-center justify-between bg-gray-50 dark:bg-[#1e293b] p-5 rounded-xl">
        <div>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            🔒 Khóa chương
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Chỉ admin hoặc người mua mới có thể xem
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isLocked"
            checked={form.isLocked}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-6"></div>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-8">
        <button
          type="button"
          onClick={() => navigate(`/admin/comics/${storyId}/chapters`)}
          className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-[#1e293b] transition"
        >
          Hủy
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold shadow-lg hover:scale-[1.02] transition disabled:opacity-60"
        >
          {loading ? "Đang lưu..." : isEditMode ? "Cập nhật chương" : "Thêm chương"}
        </button>
      </div>
    </form>
  </div>
);

}