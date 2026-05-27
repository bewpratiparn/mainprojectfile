import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  RequiredRoles?: string[];
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const ProtectedRoute = ({ children, RequiredRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const isDev = process.env.NODE_ENV === "development";
   if ( isDev) return children;
  if (!token) {
    // If not authenticated, redirect to login page
    return <Navigate to="/Login" replace />;
  }

  // Future role checking logic can be implemented here
  // if (RequiredRoles && userRole && !RequiredRoles.includes(userRole)) {
  //   return <Navigate to="/Home" replace />;
  // }

  return <>{children}</>;
};
