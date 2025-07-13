import React from 'react';
import Navbar from "../components/dashboard/Navbar.jsx";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/employeeDasshboard/Sidebar.jsx";
import {useAuth} from "../context/authContext.jsx";

const EmployeeDashboard = () => {
    const {user} = useAuth();
    return (
        <div className={"flex"}>
            <Sidebar />
            <div className={"flex-1 ml-64 bg-gray-100 h-screen"}>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default EmployeeDashboard;