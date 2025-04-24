// src/layouts/DashboardLayout.jsx
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#f3f4f6] p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link
            to="/dashboard/add-food"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            ➕ Add Food
          </Link>
          <Link
            to="/dashboard/manage-my-foods"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            🛠️ Manage My Foods
          </Link>
          <Link
            to="/dashboard/update/123"
            className="text-gray-700 hover:text-purple-600 transition font-medium"
          >
            ✏️ Update Food (test)
          </Link>
          <Link
            to="/"
            className="text-gray-500 hover:text-black transition text-sm mt-6"
          >
            ⬅️ Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
