// ComicsPage.jsx - Trang Quản lý Truyện hoàn chỉnh
import { useEffect, useState } from "react";
import { getAllComics } from "../../api/comicService";
export default function ComicsPage() {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const emotionMap = {
    1: "Buồn",
    2: "Vui",
    3: "Hành động",
    4: "Ngọt ngào",
  };

  useEffect(() => {
    loadComics();
  }, []);

  const loadComics = async () => {
    try {
      const res = await getAllComics();
      setComics(res.data);
    } catch (err) {
      alert("Không tải được danh sách truyện");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa truyện này?")) return;
    try {
      await deleteComic(id);
      loadComics(); // reload list
    } catch {
      alert("Xóa thất bại");
    }
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      {/* Page Heading & Button */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-tight text-[#111418] dark:text-white">
            Danh sách Truyện
          </h1>
          <p className="text-sm text-[#617589] dark:text-[#94A3B8]">
            Quản lý tất cả các đầu truyện hiện có trong hệ thống
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#137fec] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-600 transition-colors">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Thêm Truyện Mới</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm border border-[#dbe0e6] dark:bg-[#1A2633] dark:border-[#2A3B4D] lg:flex-row lg:items-center">
        <div className="flex-1">
          <label className="relative flex w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#617589] dark:text-[#94A3B8]">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="h-11 w-full rounded-lg border-none bg-[#f0f2f4] pl-11 pr-4 text-base text-[#111418] focus:ring-2 focus:ring-[#137fec]/50 dark:bg-[#2A3B4D] dark:text-white dark:placeholder:text-[#617589]"
              placeholder="Tìm kiếm theo tên truyện hoặc tác giả..."
              type="text"
            />
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="group flex h-10 items-center justify-between gap-2 rounded-lg border border-[#dbe0e6] bg-white px-4 text-sm font-medium text-[#111418] hover:bg-[#f0f2f4] dark:bg-[#1A2633] dark:border-[#2A3B4D] dark:text-white dark:hover:bg-[#2A3B4D] transition-colors min-w-[140px]">
            <span>Tất cả thể loại</span>
            <span className="material-symbols-outlined text-[20px] text-[#617589] dark:text-[#94A3B8]">expand_more</span>
          </button>
          <button className="group flex h-10 items-center justify-between gap-2 rounded-lg border border-[#dbe0e6] bg-white px-4 text-sm font-medium text-[#111418] hover:bg-[#f0f2f4] dark:bg-[#1A2633] dark:border-[#2A3B4D] dark:text-white dark:hover:bg-[#2A3B4D] transition-colors min-w-[140px]">
            <span>Tất cả trạng thái</span>
            <span className="material-symbols-outlined text-[20px] text-[#617589] dark:text-[#94A3B8]">expand_more</span>
          </button>
          <button className="group flex h-10 items-center justify-between gap-2 rounded-lg border border-[#dbe0e6] bg-white px-4 text-sm font-medium text-[#111418] hover:bg-[#f0f2f4] dark:bg-[#1A2633] dark:border-[#2A3B4D] dark:text-white dark:hover:bg-[#2A3B4D] transition-colors min-w-[120px]">
            <span>Mới nhất</span>
            <span className="material-symbols-outlined text-[20px] text-[#617589] dark:text-[#94A3B8]">sort</span>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-[#dbe0e6] bg-white shadow-sm dark:bg-[#1A2633] dark:border-[#2A3B4D]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-[#dbe0e6] bg-[#f8f9fa] dark:bg-[#23303E] dark:border-[#2A3B4D]">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8] w-20">
                  Ảnh bìa
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Tên truyện
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Tác giả
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Thể loại
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8]">
                  Trạng thái
                </th>
                <th className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#617589] dark:text-[#94A3B8] text-right">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dbe0e6] dark:divide-[#2A3B4D]">
              {comics.map((comic) => (
                <tr
                  key={comic.id}
                  className="hover:bg-[#fcfdfd] dark:hover:bg-[#1F2C3A] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div
                      className="h-16 w-12 rounded bg-cover bg-center shadow-sm"
                      style={{
                        backgroundImage: comic.coverImage
                          ? `url(${comic.coverImage})`
                          : "url(https://via.placeholder.com/80x120?text=No+Image)",
                      }}
                    />

                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#111418] dark:text-white line-clamp-1">
                      {comic.title}
                    </p>
                    <p className="mt-1 text-xs text-[#617589] dark:text-[#94A3B8]">
                      ID: #{comic.id}
                    </p>

                  </td>
                  <td className="px-6 py-4 text-sm text-[#111418] dark:text-[#E2E8F0]">
                    {comic.author}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-200">
                      {emotionMap[comic.emotionId] || "Khác"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${comic.status === "Hoàn thành" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                      />
                      <span className="text-sm font-medium text-[#111418] dark:text-[#E2E8F0]">
                        {comic.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#617589] hover:bg-[#f6f7f8] hover:text-[#137fec] dark:text-[#94A3B8] dark:hover:bg-[#2A3B4D] transition-colors"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          edit_square
                        </span>
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#617589] hover:bg-red-50 hover:text-red-600 dark:text-[#94A3B8] dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-[#dbe0e6] bg-white px-4 py-3 dark:bg-[#1A2633] dark:border-[#2A3B4D] sm:px-6">
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-[#617589] dark:text-[#94A3B8]">
                Hiển thị <span className="font-medium text-[#111418] dark:text-white">1</span> đến{" "}
                <span className="font-medium text-[#111418] dark:text-white">5</span> trong số{" "}
                <span className="font-medium text-[#111418] dark:text-white">28</span> kết quả
              </p>
            </div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
              <a
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-[#617589] ring-1 ring-inset ring-[#dbe0e6] hover:bg-[#f0f2f4] dark:ring-[#2A3B4D] dark:text-[#94A3B8] dark:hover:bg-[#2A3B4D]"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </a>
              <a
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-[#137fec] px-4 py-2 text-sm font-semibold text-white"
                href="#"
              >
                1
              </a>
              <a
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#111418] ring-1 ring-inset ring-[#dbe0e6] hover:bg-[#f0f2f4] dark:ring-[#2A3B4D] dark:text-white dark:hover:bg-[#2A3B4D]"
                href="#"
              >
                2
              </a>
              <a
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#111418] ring-1 ring-inset ring-[#dbe0e6] hover:bg-[#f0f2f4] dark:ring-[#2A3B4D] dark:text-white dark:hover:bg-[#2A3B4D]"
                href="#"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[#617589] ring-1 ring-inset ring-[#dbe0e6] dark:ring-[#2A3B4D] dark:text-[#94A3B8]">
                ...
              </span>
              <a
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-[#617589] ring-1 ring-inset ring-[#dbe0e6] hover:bg-[#f0f2f4] dark:ring-[#2A3B4D] dark:text-[#94A3B8] dark:hover:bg-[#2A3B4D]"
                href="#"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}