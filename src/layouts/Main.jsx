import React from "react";

import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";

const Main = () => {
  return (
    <div>
      <Navbar></Navbar>

      {/* Outlet */}
      <div className="min-h-[calc(100vh-306px)]">
        <Outlet />
      </div>
      {/* Footer */}
    </div>
  );
};

export default Main;
