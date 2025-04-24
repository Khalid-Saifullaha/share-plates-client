import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

import PrivateRoute from "./PrivateRoute";

import ErrorPage from "../pages/ErrorPage";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import FoodDetails from "../pages/FoodDetails";
import UpdateFood from "../pages/UpdateFood";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import Contact from "../pages/Contact";
import AboutUs from "../pages/AboutUs";
import DashboardLayout from "../pages/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/availableFoods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: <Register />,
      },
      {
        path: "/foodDetails/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "/my-food-request",

        element: (
          <PrivateRoute>
            <MyFoodRequest></MyFoodRequest>
          </PrivateRoute>
        ),
      },
    ],
  },
  // 🟦 Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-food",
        element: <AddFood />,
      },
      {
        path: "manage-my-foods",
        element: <ManageMyFoods />,
      },
      {
        path: "update/:id",
        element: <UpdateFood />,
      },
    ],
  },
]);

export default router;
