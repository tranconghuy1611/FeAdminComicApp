function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">📊 Tổng quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1A2633] p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Tổng truyện</h3>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-white dark:bg-[#1A2633] p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Người dùng</h3>
          <p className="text-3xl font-bold mt-2">5,678</p>
        </div>
        <div className="bg-white dark:bg-[#1A2633] p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm">Lượt xem</h3>
          <p className="text-3xl font-bold mt-2">98.7K</p>
        </div>
      </div>
    </div>
  );
}export default Dashboard;