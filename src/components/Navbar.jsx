import { useContext, useState } from "react";
import logo from "../assets/images/pngtree-s-abstract-icon-png-image_2924705.png";
import { AuthContext } from "../providers/AuthProvider";
import { Link, NavLink } from "react-router-dom";
import "./Navbar/Navbar.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [active, setactive] = useState(false);
  window.addEventListener("scroll", function () {
    if (this.window.scrollY > 100) {
      setactive(true);
    } else {
      setactive(false);
    }
  });

  return (
    <div
      className={`navbar bg-base-100 shadow-sm   ${active ? "activenav " : ""}`}
    >
      {/*  Navbar logo */}
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="Logo" />
          <span className="font-bold">SharePlate</span>
        </Link>
      </div>

      {/*  Desktop menu */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/availableFoods">Available Foods</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact Us</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          {!user && (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      </div>

      {/*  Mobile menu */}
      <div className="lg:hidden flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-[1000]"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <NavLink to="/availableFoods">Available Foods</NavLink>
            </li>

            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            {!user && (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* User profile */}
      {user && (
        <div className="dropdown dropdown-end z-50">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div title={user?.displayName} className="w-10 rounded-full">
              <img
                referrerPolicy="no-referrer"
                alt="User Profile Photo"
                src={user?.photoURL}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1000] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="mt-2">
              <Link to="/dashboard" className="block text-center">
                Dashboard
              </Link>
            </li>

            <li className="mt-2">
              <button
                onClick={logOut}
                className="bg-gray-200 block text-center"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
