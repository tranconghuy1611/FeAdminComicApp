// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    BookOpenIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { loginAdmin, getMe } from "../../api/authService";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
            return;
        }

        try {
            setLoading(true);

            // 1️⃣ Login → lấy token
            const res = await loginAdmin({ username, password });

            if (!res.data?.token) {
                throw new Error("Không nhận được token");
            }

            localStorage.setItem("token", res.data.token);

            // 2️⃣ Gọi /users/me → lấy role
            const meRes = await getMe();

            const user = meRes.data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", user.role);

            // 3️⃣ Check role
            if (user.role !== "ADMIN") {
                alert("Bạn không có quyền truy cập trang Admin");
                localStorage.clear();
                return;
            }

            navigate("/admin");

        } catch (err) {
            alert(err.response?.data?.message || "Đăng nhập thất bại!");
            localStorage.clear();
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="min-h-screen flex">
                {/* Bên trái - Gradient + Logo (ẩn trên mobile) */}
                {/* Bên trái - Gradient + Logo + Comic style (ẩn trên mobile) */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    {/* Nền gradient mới + comic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-cyan-500 to-pink-600"></div>

                    {/* Overlay comic effect: radial rays + halftone dots */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_50%)]"></div>
                        <div className="absolute inset-0 bg-repeat bg-[length:8px_8px] opacity-20"
                            style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)' }}></div>
                    </div>

                    {/* Dark overlay để text nổi bật hơn */}
                    <div className="absolute inset-0 bg-black opacity-40"></div>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-10">
                        {/* Logo lớn với effect */}
                        <div className="bg-white bg-opacity-25 backdrop-blur-md rounded-3xl p-8 mb-10 shadow-2xl transition-transform duration-500 hover:scale-110">
                            <BookOpenIcon className="w-24 h-24 text-white drop-shadow-lg" />
                        </div>

                        <h1 className="text-6xl font-extrabold mb-6 text-center drop-shadow-2xl tracking-tight">
                            Thế Giới Truyện Tranh
                        </h1>

                        <p className="text-center text-xl opacity-95 max-w-lg leading-relaxed mb-12 px-8">
                            Khám phá hàng ngàn bộ manga đỉnh cao, cập nhật liên tục.
                            <br />
                            <span className="font-semibold text-yellow-300">Hành trình phiêu lưu bắt đầu từ đây! 💥</span>
                        </p>

                        {/* Comic dots + small speech bubble effect */}
                        <div className="flex gap-6 mb-8">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                            <div className="w-4 h-4 bg-white rounded-full animate-pulse delay-150"></div>
                            <div className="w-4 h-4 bg-pink-400 rounded-full animate-pulse delay-300"></div>
                        </div>

                        {/* Small comic elements */}
                        <div className="absolute top-20 left-10 text-5xl font-bold rotate-12 opacity-60">
                            BOOM!
                        </div>
                        <div className="absolute bottom-32 right-16 text-4xl font-bold -rotate-12 opacity-50">
                            POW!
                        </div>
                    </div>
                </div>

                {/* Bên phải - Form đăng nhập */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6 py-12">
                    <div className="max-w-md w-full">
                        {/* Logo nhỏ trên mobile */}
                        <div className="flex justify-center lg:hidden mb-8">
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-5 shadow-lg">
                                <BookOpenIcon className="w-14 h-14 text-white" />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center bg-blue-100 rounded-2xl px-6 py-3 mb-4">
                                    <span className="text-2xl">📚</span>
                                    <span className="ml-3 text-lg font-semibold text-blue-700">
                                        ComicWorld
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Chào mừng trở lại! 👋
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Đăng nhập để tiếp tục đọc bộ truyện yêu thích.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email hoặc Tên đăng nhập
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl
  text-gray-900
  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập tài khoản của bạn"
                                        required
                                        disabled={loading}
                                    />

                                </div>

                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mật khẩu
                                    </label>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl
  text-gray-900
  focus:outline-none focus:ring-2 focus:ring-blue-500
  pr-12"
                                        placeholder="Nhập mật khẩu"
                                        required
                                        disabled={loading}
                                    />


                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={loading}
                                        className="absolute right-4 top-1/2 -translate-y-0
               text-gray-500 hover:text-gray-700
               focus:outline-none"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="w-5 h-5" />
                                        ) : (
                                            <EyeIcon className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>


                                <div className="flex justify-between items-center text-sm">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
                                            disabled={loading}
                                        />
                                        <span className="text-gray-600">Nhớ mật khẩu</span>
                                    </label>
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Quên mật khẩu?
                                    </a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Đang đăng nhập...
                                        </>
                                    ) : (
                                        "Đăng nhập ngay"
                                    )}
                                </button>
                            </form>

                            <div className="mt-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">HOẶC</span>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50">
                                        <img
                                            src="https://www.google.com/favicon.ico"
                                            alt="Google"
                                            className="w-5 h-5 mr-2"
                                        />
                                        <span className="text-gray-700 font-medium">Google</span>
                                    </button>
                                    <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50">
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                            <path
                                                fill="#1877F2"
                                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                            />
                                        </svg>
                                        <span className="text-gray-700 font-medium">Facebook</span>
                                    </button>
                                </div>
                            </div>

                            <p className="text-center text-sm text-gray-600 mt-8">
                                Bạn là người mới?{" "}
                                <a
                                    href="#"
                                    className="text-blue-600 font-semibold hover:underline"
                                >
                                    Đăng ký tài khoản
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}