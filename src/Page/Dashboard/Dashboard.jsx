import { useState, useEffect } from "react";
import {
  ArrowTrendingUpIcon,
  BookOpenIcon,
  UserGroupIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon, // Icon mới cho Nhiệm vụ
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

import { getAllComics } from "../../api/comicService";
import { getAllChapter } from "../../api/chapterService";
import { getAllUsers } from "../../api/userService";
import { getAllTasks } from "../../api/taskService"; // API nhiệm vụ mới

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalComics: null,
    totalChapters: null,
    totalUsers: null,
    totalTasks: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        // Gọi song song 4 API để tối ưu tốc độ
        const [comicsRes, chaptersRes, usersRes, tasksRes] = await Promise.all([
          getAllComics(),
          getAllChapter(),
          getAllUsers(),
          getAllTasks(),
        ]);

        setStats({
          totalComics: comicsRes.data.length,
          totalChapters: chaptersRes.data.length,
          totalUsers: usersRes.data.length,
          totalTasks: tasksRes.data.length,
        });
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu dashboard:", err);
        setError("Không thể tải một số dữ liệu thống kê");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format số đẹp: 1234 → 1.2K+, 1500000 → 1.5M
  const formatNumber = (num) => {
    if (num === null) return "—";
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K+`;
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tổng quan hệ thống
            </h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition">
                Xuất báo cáo
              </button>
              {/* <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-md">
                + Thêm truyện mới
              </button> */}
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Xin chào! Dưới đây là báo cáo hoạt động trong ngày hôm nay.
            {error && <span className="ml-2 text-red-500 text-xs">({error})</span>}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Tổng số truyện */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng số truyện</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-9 w-24 rounded inline-block"></span> : formatNumber(stats.totalComics)}
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 dark:text-green-400 font-medium">+53</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">so với tháng trước</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Tổng số chương */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng số chương</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-9 w-24 rounded inline-block"></span> : formatNumber(stats.totalChapters)}
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 dark:text-green-400 font-medium">+12%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">tăng trưởng mạnh</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Tổng tài khoản */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng tài khoản</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-9 w-24 rounded inline-block"></span> : formatNumber(stats.totalUsers)}
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 dark:text-green-400 font-medium">+18%</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">trong 7 ngày qua</span>
                </div>
              </div>
              <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                <UsersIcon className="w-8 h-8 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
          </div>

          {/* Tổng nhiệm vụ - THAY THẾ CHO TỔNG LƯỢT XEM */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng nhiệm vụ</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? <span className="animate-pulse bg-gray-200 dark:bg-gray-700 h-9 w-24 rounded inline-block"></span> : formatNumber(stats.totalTasks)}
                </p>
                <div className="flex items-center mt-3 text-sm">
                  <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 dark:text-green-400 font-medium">+8</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">nhiệm vụ mới tuần này</span>
                </div>
              </div>
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-xl">
                <ClipboardDocumentCheckIcon className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ và bình luận giữ nguyên */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lượt truy cập theo thời gian</h3>
              <select className="text-sm px-3 py-1.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-gray-50 dark:bg-slate-700">
                <option>7 ngày qua</option>
                <option>30 ngày qua</option>
                <option>90 ngày qua</option>
              </select>
            </div>
            <div className="h-64 flex items-end justify-between gap-2">
              {[32, 40, 24, 56, 64, 48, 36].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center">
                  <div className={`w-full ${i === 3 || i === 4 ? 'bg-blue-500' : 'bg-blue-500/20'} rounded-t-lg`} style={{ height: `${h * 4}px` }}></div>
                  <p className="text-xs text-gray-500 mt-2">{['T2','T3','T4','T5','T6','T7','CN'][i]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Bình luận mới nhất
            </h3>
            <div className="space-y-4">
              {["Hoàng Nam", "Lan Anh", "Minh Tuấn"].map((name, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${i===0?'from-yellow-400 to-orange-500':i===1?'from-pink-400 to-red-500':'from-blue-400 to-cyan-500'} flex-shrink-0`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bình luận hay lắm...</p>
                    <p className="text-xs text-gray-500 mt-1">{i===0?'2 phút':i===1?'15 phút':'1 giờ'} trước</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="block text-center text-sm text-blue-600 hover:underline mt-4">
              Xem thêm bình luận
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
}