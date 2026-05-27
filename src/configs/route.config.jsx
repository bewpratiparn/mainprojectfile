import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Search from "../components/Search";
import Home2 from "../pages/Home/Home2";
import Home3 from "../pages/Home/Home3";
import Login from "../pages/Auth/Login";
import Logout from "../pages/Auth/Logout";
import Register from "../pages/Auth/Register";
import Translate from "../pages/Misc/Translate";
import AddFood from "../pages/Food/AddFood";
import AddDataShop from "../pages/Shop/AddDataShop";
import RecipeDetail from "../pages/Food/RecipeDetail";
import Fooddetails from "../pages/Food/Fooddetails";
import Editstore from "../pages/Shop/Editstore";
import Store_information from "../pages/Shop/Store_information";
import Notshowfood from "../pages/Food/Notshowfood";
import Profile from "../pages/User/Profile";
import Slideshow from "../pages/Misc/Slideshow";
import Showuser from "../pages/User/Showuser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // The Layout Wrapper
    children: [
      { path: "/", element: <Navigate to="/Home" replace /> },
      { path: "Home", element: <Home /> },
      { path: "Home2", element: <Home2 /> },
      { path: "Home3", element: <Home3 /> },
      { path: "Search", element: <Search /> },
      { path: "Translate", element: <Translate /> },
      { path: "AddFood", element: <AddFood /> },
      { path: "AddDataShop", element: <AddDataShop /> },
      { path: "RecipeDetail", element: <RecipeDetail /> },
      { path: "Fooddetails", element: <Fooddetails /> },
      { path: "Editstore", element: <Editstore /> },
      { path: "Store_information", element: <Store_information /> },
      { path: "Notshowfood", element: <Notshowfood /> },
      { path: "Profile", element: <Profile /> },
      { path: "Slideshow", element: <Slideshow /> },
      { path: "Showuser", element: <Showuser /> },
    ],
  },
  { path: "/Login", element: <Login /> },
  { path: "/Logout", element: <Logout /> },
  { path: "/Register", element: <Register /> },
]);
