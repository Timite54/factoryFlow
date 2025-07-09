import React from 'react';
import {useAuth} from "../context/authContext.jsx";
import {Outlet, useNavigate} from "react-router-dom";
import AdminSideBar from "../components/dashboard/AdminSideBar.jsx";
import Navbar from "../components/dashboard/Navbar.jsx";
import AdminSummary from "../components/dashboard/AdminSummary.jsx";

const AdminDashboard = () => {
    const {user} = useAuth();
    // const navigate = useNavigate()
    // if (loading) {
    //     return <div>loading...</div>;
    // }
    // if (!user) {
    //     navigate("/login");
    // }
    return (
        <div className={"flex"}>
            <AdminSideBar />
            <div className={"flex-1 ml-64 bg-gray-100 h-screen"}>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;