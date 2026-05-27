import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../paeges/Home";
import Search from "../components/Search";
import Home2 from "../paeges/Home2";
import Home3 from "../paeges/Home3";
import Login from "../paeges/Login";
import Logout from "../paeges/Logout";
import Register from "../paeges/Register";
import Translate from "../paeges/Translate";
import AddFood from "../paeges/AddFood";
import AddDataShop from "../paeges/AddDataShop";
import RecipeDetail from "../paeges/RecipeDetail";
import Fooddetails from "../paeges/Fooddetails";
import Editstore from "../paeges/Editstore";
import Store_information from "../paeges/Store_information";
import Notshowfood from "../paeges/Notshowfood";
import Profile from "../paeges/Profile";
import Slideshow from "../paeges/Slideshow";
import Showuser from "../paeges/Showuser";

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
