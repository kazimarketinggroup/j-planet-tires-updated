/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {

const { user } = useSelector((state: any) => state.auth);

const role = user?.role; 
console.log(" Role in AdminRoute:", user);

  if (role === "admin") return <>{children}</>;

  return <Navigate to="/" replace />;
};

export default AdminRoute;

