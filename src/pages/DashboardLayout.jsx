import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import {
  FaPlusCircle,
  FaTools,
  FaEdit,
  FaBars,
  FaTimes, // Correcting the incorrect FaTime usage
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/images/pngtree-s-abstract-icon-png-image_2924705.png";
import { AuthContext } from "../providers/AuthProvider";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        // Optionally navigate or show toast
        console.log("Logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Topbar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-purple-700 text-white shadow-md">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <button onClick={toggleSidebar}>
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}{" "}
            {/* Corrected FaTime to FaTimes */}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-gray-100 px-6 py-8 shadow-md lg:relative fixed top-0 left-0 h-screen z-50 transition-transform duration-300 ease-in-out flex flex-col `}
      >
        {/* Close Button for Sidebar */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden absolute top-4 right-4 text-gray-700 hover:text-purple-600"
        >
          <FaTimes size={24} />
        </button>
        <div>
          {/* Logo */}
          <Link to="/" className="flex gap-2 items-center mb-6">
            <img className="w-auto h-7" src={logo} alt="Logo" />
            <span className="font-bold">SharePlate</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4">
            <Link
              to="/dashboard/manage-my-foods"
              className="text-gray-700 hover:text-gray-900 font-medium"
              onClick={toggleSidebar}
            >
              <FaTools className="inline-block mr-2" />
              Manage My Foods
            </Link>
            <Link
              to="/dashboard/add-food"
              className="text-gray-700 hover:text-gray-900 font-medium"
              onClick={toggleSidebar}
            >
              <FaPlusCircle className="inline-block mr-2" />
              Add Food
            </Link>

            <Link
              to="/"
              className="text-gray-500 hover:text-black text-sm mt-6"
              onClick={toggleSidebar}
            >
              Back to Home
            </Link>
          </nav>
        </div>

        {/* ✅ Logout Bottom Fixed */}
        <div className="mt-auto lg:mt-auto">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-2 mt-60"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-4 lg:p-8 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
