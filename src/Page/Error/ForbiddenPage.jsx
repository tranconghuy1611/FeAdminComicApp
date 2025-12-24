import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-7xl font-bold text-red-600">403</h1>
      <p className="mt-4 text-xl text-gray-700">
        Bạn không có quyền truy cập trang này
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Quay về đăng nhập
      </Link>
    </div>
  );
}
