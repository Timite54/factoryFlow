import React from 'react';
import {FaUser} from "react-icons/fa6";
import {useAuth} from "../../context/authContext.jsx";

const Summary = () => {
    const {user} = useAuth();
    return (
        <div className={"p-10"}>
            <div className={"rounded flex bg-white"}>
                <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-5 rounded`}>
                    <FaUser />
                </div>
                <div className={"pl-4 py-1"}>
                    <p className={"text-lg font-semibold"}>Bienvenue</p>
                    <p className={"text-xl font-bold"}>{user.name}</p>
                </div>
            </div>
        </div>
    );
};

export default Summary;