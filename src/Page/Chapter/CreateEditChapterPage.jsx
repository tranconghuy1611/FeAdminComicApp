import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createChapter, updateChapter, getChapterById } from "../../api/chapterService";
import { ArrowLeftIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";

export default function CreateEditChapterPage() {
  const { id: storyId, chapterId } = useParams();
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

  useEffect(() => {
    if (isEditMode) loadChapter();
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
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      isEditMode ? await updateChapter(chapterId, form) : await createChapter(form);
      alert(isEditMode ? "Cập nhật thành công!" : "Thêm chương thành công!");
      navigate(`/admin/comics/${storyId}/chapters`);
    } catch (err) {
      alert(err.response?.data?.message || "Lưu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-lg text-gray-600 dark:text-gray-400">Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700">
          {/* Header gọn */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              📘 {isEditMode ? "Chỉnh sửa Chương" : "Thêm Chương Mới"}
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 text-sm"
            >
              <ArrowLeftIcon className="w-5 h-5" /> Quay lại
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* 2 cột */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Số chương <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="chapterNumber"
                  value={form.chapterNumber}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tiêu đề chương <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Chương 1: Bắt đầu hành trình"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mô tả ngắn
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="2"
                placeholder="Tóm tắt nội dung chương..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none resize-none"
              />
            </div>

            {/* Nội dung */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nội dung chương <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows="12"
                  required
                  placeholder="Viết nội dung chương tại đây..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none font-medium leading-relaxed"
                />
                <span className="absolute bottom-2 right-3 text-xs text-gray-500">
                  {form.content.length} ký tự
                </span>
              </div>
            </div>

            {/* Khóa chương */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {form.isLocked ? (
                  <LockClosedIcon className="w-6 h-6 text-orange-600" />
                ) : (
                  <LockOpenIcon className="w-6 h-6 text-gray-500" />
                )}
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {form.isLocked ? "Chương bị khóa" : "Chương công khai"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {form.isLocked ? "Chỉ xem khi mua" : "Miễn phí cho mọi người"}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isLocked"
                  checked={form.isLocked}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700 font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md hover:shadow-lg disabled:opacity-60 transition flex items-center gap-2"
              >
                {loading && <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" /><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" /></svg>}
                {loading ? "Đang lưu..." : isEditMode ? "Cập nhật" : "Thêm chương"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}