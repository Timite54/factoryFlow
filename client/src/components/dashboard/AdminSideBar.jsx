import React from 'react';
import {NavLink} from "react-router-dom";
import {FaBuilding, FaMoneyBillWave, FaUsers} from "react-icons/fa6";
import {FaCogs, FaCalendarAlt, FaTachometerAlt} from "react-icons/fa";

const AdminSideBar = () => {
    return (
        <div className={"bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64 "}>
            <div className={"bg-teal-600 h-12 flex items-center justify-center"}>
                <h3 className={"text-2xl text-center font-tektur"}>Factory Flow</h3>
            </div>

            <div className={"px-4"}>
                <NavLink to={"/admin-dashboard"}
                         className={({isActive}) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}
                         end>
                    <FaTachometerAlt/> <span>Tableau De Bord</span>
                </NavLink>
                <NavLink to={"/admin-dashboard/employees"}
                         className={({isActive}) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaUsers/> <span>Personnel</span>
                </NavLink>
                <NavLink to={"/admin-dashboard/departments"}
                         className={({isActive}) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaBuilding/> <span>Départements</span>
                </NavLink>
                <NavLink to={"/admin-dashboard/leaves"}
                         className={({isActive}) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaCalendarAlt/> <span>Congés</span>
                </NavLink>
                <NavLink to={"/admin-dashboard/salary/add"}
                         className={({isActive}) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaMoneyBillWave/> <span>Salaire</span>
                </NavLink>
                <NavLink to={"/admin-dashboard/setting"}
                         className={({isActive}) => `${isActive ? "bg-teal-500 " : " "}  flex items-center space-x-4 block py-2.5 px-4 rounded`}>
                    <FaCogs/> <span>Paramètres</span>
                </NavLink>
            </div>

        </div>
    );
};

export default AdminSideBar;