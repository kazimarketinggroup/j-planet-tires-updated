/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


interface UserRouteProps {
  children: ReactNode;
}

const UserRoute = ({ children }: UserRouteProps) => {

const { user } = useSelector((state: any) => state.auth);

// const role = user?.role; 
console.log(" Role in UserRoute:", user);

  if (user) return <>{children}</>;

  return <Navigate to="/" replace />;
};

export default UserRoute;

