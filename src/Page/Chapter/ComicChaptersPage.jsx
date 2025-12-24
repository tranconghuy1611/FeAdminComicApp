// ComicChaptersPage.jsx - ĐÃ SỬA NÚT QUAY LẠI ĐẸP HƠN
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import { deleteChapter } from "../../api/chapterService";

export default function ComicChaptersPage() {
  const { id } = useParams(); // storyId
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [comicTitle, setComicTitle] = useState("Truyện");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [chapterToDelete, setChapterToDelete] = useState(null);

  useEffect(() => {
    loadChapters();
  }, [id]);

  const loadChapters = async () => {
    try {
      const res = await axiosClient.get(`/api/chapters?storyId=${id}`);
      const sortedChapters = res.data.sort((a, b) =>
        (a.chapterNumber || 0) - (b.chapterNumber || 0)
      );
      setChapters(sortedChapters);

      if (res.data.length > 0 && res.data[0].storyTitle) {
        setComicTitle(res.data[0].storyTitle);
      }
    } catch (err) {
      alert("Không tải được danh sách chương!");
      navigate("/admin/comics");
    } finally {
      setLoading(false);
    }
  };

  // Lọc chương
  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (chapter.chapterNumber + "").includes(searchTerm)
  );

  // Mở modal xóa
  const openDeleteModal = (chapter) => {
    setChapterToDelete(chapter);
    setShowDeleteModal(true);
  };

  // Xác nhận xóa
  const confirmDelete = async () => {
    if (!chapterToDelete) return;

    try {
      await deleteChapter(chapterToDelete.id);
      alert("Xóa chương thành công!");
      loadChapters();
    } catch (err) {
      alert("Xóa chương thất bại!");
    } finally {
      setShowDeleteModal(false);
      setChapterToDelete(null);
    }
  };

  // Đóng modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setChapterToDelete(null);
  };

  // Toggle khóa/mở khóa chương
  const toggleLockChapter = async (chapter) => {
    try {
      const updatedChapter = { ...chapter, isLocked: !chapter.isLocked };
      await axiosClient.put(`/api/chapters/${chapter.id}`, updatedChapter);
      loadChapters();
    } catch (err) {
      alert("Cập nhật trạng thái khóa thất bại!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Đang tải danh sách chương...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* NÚT QUAY LẠI MỚI - ĐẸP, HIỆN ĐẠI */}
      <button
        onClick={() => navigate("/admin/comics")}
        className="mb-6 flex items-center gap-2 rounded-xl border border-[#dbe0e6] dark:border-[#2A3B4D] bg-white dark:bg-[#1A2633] px-5 py-3 font-medium text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-[#23303E] hover:shadow-md transition-all shadow-sm"
      >
        <span className="material-symbols-outlined text-xl">arrow_back</span>
        Quay lại danh sách truyện
      </button>

      {/* Header chính */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-black dark:text-white">
            Chương của truyện: <span className="text-[#137fec]">{comicTitle}</span>
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Tổng cộng: <strong>{chapters.length}</strong> chương
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input
              type="text"
              placeholder="Tìm chương theo số hoặc tiêu đề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full min-w-64 rounded-lg border border-gray-300 bg-white pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#137fec] dark:border-gray-600 dark:bg-[#1A2633]"
            />
          </div>

          <button
            onClick={() => navigate(`/admin/comics/${id}/chapters/create`)}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#137fec] px-6 py-3 font-bold text-white hover:bg-blue-600 shadow-md transition"
          >
            <span className="material-symbols-outlined">add</span>
            Thêm chương mới
          </button>
        </div>
      </div>

      {/* Bảng chương */}
      <div className="overflow-hidden rounded-xl border border-[#dbe0e6] bg-white shadow-sm dark:border-[#2A3B4D] dark:bg-[#1A2633]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#dbe0e6] bg-[#f8f9fa] dark:bg-[#23303E] dark:border-[#2A3B4D]">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  STT / Chương
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Tiêu đề chương
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Ngày đăng
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8] text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#2A3B4D]">
              {filteredChapters.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-500 dark:text-gray-400">
                    {searchTerm ? "Không tìm thấy chương nào phù hợp" : "Chưa có chương nào. Hãy thêm chương đầu tiên!"}
                  </td>
                </tr>
              ) : (
                filteredChapters.map((chapter, index) => (
                  <tr
                    key={chapter.id}
                    className="hover:bg-[#fcfdfd] dark:hover:bg-[#1F2C3A] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-[#111418] dark:text-white">
                      {chapter.chapterNumber || index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p className="font-medium text-[#111418] dark:text-white line-clamp-2">
                          {chapter.title || `(Chương ${chapter.chapterNumber || index + 1})`}
                        </p>
                        {chapter.description && (
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                            {chapter.description}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleLockChapter(chapter)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          chapter.isLocked
                            ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
                            : "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
                        }`}
                      >
                        {chapter.isLocked ? "Đã khóa" : "Mở"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#617589] dark:text-[#94A3B8]">
                      {new Date(chapter.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => navigate(`/admin/comics/${id}/chapters/edit/${chapter.id}`)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-[#617589] hover:bg-blue-100 hover:text-[#137fec] dark:bg-[#2A3B4D] dark:hover:bg-[#137fec]/20 transition-all"
                          title="Sửa chương"
                        >
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>

                        <button
                          onClick={() => openDeleteModal(chapter)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-[#617589] hover:bg-red-100 hover:text-red-600 dark:bg-[#2A3B4D] dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-all"
                          title="Xóa chương"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-sm"
            onClick={closeDeleteModal}
          />
          <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white dark:bg-[#1A2633] p-6 shadow-2xl border border-[#dbe0e6] dark:border-[#2A3B4D]">
            <h2 className="text-2xl font-bold text-[#111418] dark:text-white mb-4">
              Xác nhận xóa chương
            </h2>
            <p className="text-base text-[#617589] dark:text-[#94A3B8] leading-relaxed mb-6">
              Bạn có chắc chắn muốn xóa chương
              <span className="font-bold text-[#111418] dark:text-white mx-1">
                "{chapterToDelete?.title || `Chương ${chapterToDelete?.chapterNumber}`}"
              </span>
              không?
              <br />
              <span className="text-red-600 dark:text-red-400 font-medium">
                Hành động này không thể hoàn tác.
              </span>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDeleteModal}
                className="px-6 py-3 text-sm font-medium border border-[#dbe0e6] dark:border-[#2A3B4D] rounded-lg hover:bg-gray-100 dark:hover:bg-[#2A3B4D]"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-7 py-3 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 shadow-lg"
              >
                Xóa chương
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}