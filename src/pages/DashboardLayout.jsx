// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaPlusCircle, FaTools, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/images/pngtree-s-abstract-icon-png-image_2924705.png";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-purple-700 text-white shadow-md">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-gray-100 px-6 py-8 shadow-md lg:relative fixed top-0 left-0 max-h-full z-50 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <Link to="/" className="flex gap-2 items-center mb-6">
          <img className="w-auto h-7" src={logo} alt="Logo" />
          <span className="font-bold">SharePlate</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <Link
            to="/dashboard/add-food"
            className="text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            <FaPlusCircle className="inline-block mr-2" />
            Add Food
          </Link>
          <Link
            to="/dashboard/manage-my-foods"
            className="text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            <FaTools className="inline-block mr-2" />
            Manage My Foods
          </Link>
          <Link
            to="/dashboard/manage-my-foods"
            className="text-gray-700 hover:text-purple-600 font-medium"
            onClick={() => setSidebarOpen(false)}
          >
            <FaEdit className="inline-block mr-2" />
            Update Food (test)
          </Link>
          <Link
            to="/"
            className="text-gray-500 hover:text-black text-sm mt-6"
            onClick={() => setSidebarOpen(false)}
          >
            ⬅️ Back to Home
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-4 lg:p-8 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
