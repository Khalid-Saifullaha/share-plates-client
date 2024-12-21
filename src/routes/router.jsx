import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";

import PrivateRoute from "./PrivateRoute";

import MyPostedJobs from "../pages/ManageMyFoods";

import ErrorPage from "../pages/ErrorPage";
import AvailableFoods from "../pages/AvailableFoods";
import AddFood from "../pages/AddFood";
import FoodDetails from "../pages/FoodDetails";
import UpdateFood from "../pages/UpdateFood";
import ManageMyFoods from "../pages/ManageMyFoods";

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
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateFood></UpdateFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",

        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },

      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
