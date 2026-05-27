import React, { Suspense } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { theme } from "./configs/theme.config";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import LoadingBackdrop from "./components/loading/LoadingBackdrop";

import MainLayout from "./layouts/MainLayout";

// Lazy Loaded Pages
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Logout = React.lazy(() => import("./pages/Auth/Logout"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Translate = React.lazy(() => import("./pages/Misc/Translate"));
const AddFood = React.lazy(() => import("./pages/Food/AddFood"));
const AddDataShop = React.lazy(() => import("./pages/Shop/AddDataShop"));
const RecipeDetail = React.lazy(() => import("./pages/Food/RecipeDetail"));
const Fooddetails = React.lazy(() => import("./pages/Food/Fooddetails"));
const Editstore = React.lazy(() => import("./pages/Shop/Editstore"));
const Store_information = React.lazy(() => import("./pages/Shop/Store_information"));
const Notshowfood = React.lazy(() => import("./pages/Food/Notshowfood"));
const Profile = React.lazy(() => import("./pages/User/Profile"));
const Slideshow = React.lazy(() => import("./pages/Misc/Slideshow"));
const Showuser = React.lazy(() => import("./pages/User/Showuser"));
const Search = React.lazy(() => import("./components/Search"));
const PageNotFound = React.lazy(() => import("./pages/Misc/PageNotFound"));

function App() {
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Suspense fallback={<LoadingBackdrop open={true} />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Logout" element={<Logout />} />
          
          {/* Main App Routes wrapped in ProtectedRoute and Layout */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <MainLayout />
                  <ToastContainer
                    position="bottom-right"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                  />
                </>
              </ProtectedRoute>
            }
          >
            {/* Dashboard / Nested Routes */}
            <Route index element={<Navigate to="/Home" replace />} />
            <Route path="Home" element={<Home />} />
            <Route path="Search" element={<Search />} />
            <Route path="Translate" element={<Translate />} />
            <Route path="AddFood" element={<AddFood />} />
            <Route path="AddDataShop" element={<AddDataShop />} />
            <Route path="RecipeDetail" element={<RecipeDetail />} />
            <Route path="Fooddetails" element={<Fooddetails />} />
            <Route path="Editstore" element={<Editstore />} />
            <Route path="Store_information" element={<Store_information />} />
            <Route path="Notshowfood" element={<Notshowfood />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="Slideshow" element={<Slideshow />} />
            <Route path="Showuser" element={<Showuser />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
