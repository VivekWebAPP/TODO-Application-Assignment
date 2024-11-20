import React from "react";
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  priv: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, priv }) => {

  const token = localStorage.getItem('AuthToken');

  if (!!token === priv) {
    return <>{children}</>;
  } else {
    return <Navigate to={{
      pathname: token ? "/sigin" : "/login"
    }} />
  }


};

export default ProtectedRoute;
