import React from 'react';
import {useAuth} from "../context/authContext.jsx";
import {Navigate} from "react-router-dom";

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth();
    if (loading) {
        return <div>Loading...</div>
    }
    
    if (!requiredRole.includes(user.role)) {
        return <Navigate to={"/unauthorize"} />
    }

    if (!user) {
        return user ? children :  <Navigate to={"/login"} />
    }

    return children;
};

export default RoleBaseRoutes;