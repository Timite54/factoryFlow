import React from 'react';
import {useAuth} from "../../context/authContext.jsx";

const Navbar = () => {
    const {user, logout} = useAuth();
    return (
        <div className={"flex items-center text-white justify-between h-12 bg-teal-600 px-8"}>
            <p>Welcome, {user.name}</p>
            <button
                className={"px-7 py-1.5 bg-teal-700 rounded-2xl hover:bg-teal-800 hover:rounded-xl"}
                onClick={logout}
            >Logout</button>
        </div>
    );
};

export default Navbar;