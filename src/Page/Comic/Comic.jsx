// ComicsPage.jsx - Phiên bản 3 NÚT ĐỀU NHAU, NHỎ GỌN & ĐẸP
import { useEffect, useState } from "react";
import { getAllComics, deleteComic } from "../../api/comicService";
import { useNavigate } from "react-router-dom";

export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const emotionStyles = {
    1: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    2: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    3: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    4: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  };

  const emotionNames = { 1: "Buồn", 2: "Vui", 3: "Hành động", 4: "Ngọt ngào" };

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async () => {
    try {
      const res = await getAllComics();
      setComics(res.data);
    } catch {
      alert("Không tải được danh sách truyện");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteComic(deleteTarget.id);
      alert("Xóa thành công!");
      loadComics();
    } catch {
      alert("Xóa thất bại!");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-32 text-xl text-gray-600 dark:text-gray-400">
        Đang tải...
      </div>
    );

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-4xl font-black text-[#111418] dark:text-white">Danh sách Truyện</h1>
          <p className="mt-2 text-base text-[#617589] dark:text-[#94A3B8]">
            Quản lý tất cả đầu truyện trong hệ thống
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/comics/create")}
          className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#137fec] to-blue-600 px-6 py-4 font-bold text-white shadow-lg hover:shadow-xl transition-shadow"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          Thêm Truyện Mới
        </button>
      </div>

      {/* Grid Cards */}
      {comics.length === 0 ? (
        <p className="py-20 text-center text-lg text-gray-500 dark:text-gray-400">
          Chưa có truyện nào. Hãy thêm truyện đầu tiên!
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {comics.map((comic) => {
            const emotionClass = emotionStyles[comic.emotionId] || "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
            const emotionName = emotionNames[comic.emotionId] || "Khác";

            return (
              <div
                key={comic.id}
                className="flex flex-col rounded-2xl bg-white dark:bg-[#1A2633] shadow-lg overflow-hidden h-full"
              >
                {/* Ảnh bìa */}
                <div className="aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <img
                    src={comic.coverImage || "https://via.placeholder.com/300x400/1A2633/94A3B8?text=No+Image"}
                    alt={comic.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Nội dung */}
                <div className="flex flex-col flex-1 p-6 justify-between">
                  <div>
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#111418] dark:text-white">
                      {comic.title}
                    </h3>
                    <p className="mb-4 text-sm text-[#617589] dark:text-[#94A3B8]">
                      {comic.author}
                    </p>
                    <span className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${emotionClass}`}>
                      {emotionName}
                    </span>
                  </div>

                  {/* 3 NÚT ĐỀU NHAU - NHỎ GỌN, CÂN ĐỐI */}
                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/admin/comics/${comic.id}/chapters`)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-md"
                      title="Quản lý chương"
                    >
                      <span className="material-symbols-outlined text-2xl">menu_book</span>
                    </button>

                    <button
                      onClick={() => navigate(`/admin/comics/edit/${comic.id}`)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors shadow-md"
                      title="Sửa truyện"
                    >
                      <span className="material-symbols-outlined text-2xl">edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteTarget(comic)}
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-md"
                      title="Xóa truyện"
                    >
                      <span className="material-symbols-outlined text-2xl">delete</span>
                    </button>
                  </div>

                  <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-500">
                    ID: #{comic.id}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Xóa */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#1A2633] p-8 shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold text-[#111418] dark:text-white">Xác nhận xóa</h2>
            <p className="mb-8 text-base text-[#617589] dark:text-[#94A3B8]">
              Xóa truyện <span className="font-bold text-[#111418] dark:text-white">"{deleteTarget.title}"</span>?
              <br />
              <span className="font-semibold text-red-600 dark:text-red-400">Không thể hoàn tác!</span>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-[#dbe0e6] dark:border-[#2A3B4D] px-6 py-3 font-medium hover:bg-gray-100 dark:hover:bg-[#2A3B4D] transition"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-7 py-3 font-bold text-white shadow-lg hover:from-red-700 transition"
              >
                Xóa truyện
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}