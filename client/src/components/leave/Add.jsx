import React, {useState} from 'react';
import {useAuth} from "../../context/authContext.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Add = () => {
    const {user} = useAuth()
    const [leave, setLeave] = useState({
        userId: user?._id,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLeave((prevState) => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/leave/add",
                leave,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (new Date(leave.startDate) > new Date(leave.endDate)) {
                alert("La date de début doit être antérieure à la date de fin.");
                return;
            }
            if (response.data.success) {
                navigate("/employee-dashboard/leaves")

            }
        }catch (error) {
            console.error(error);
            if (error.response && !error.response.data.error)
                alert(error.response.data.error);
        }
    }

    return (
        <div className={"max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md"}>
            <h2 className={"text-2xl font-bold mb-6"}>Demande De Congé</h2>
            <form onSubmit={handleSubmit}>
                <div className={"flex flex-col space-y-4"}>
                    <div>
                        <label className={"text-sm font-medium text-gray-700"}>
                            Type De Congé
                        </label>
                        <select
                            name={"leaveType"}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        >
                            <option value={""}>Choisissez Le Type</option>
                            <option value={"Sick Leave"}>Congé De Maladie</option>
                            <option value={"Casual Leave"}>Congé Occasionnel</option>
                            <option value={"Annual Leave"}>Congé Annuel</option>
                        </select>
                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Date De Début
                            </label>
                            <input
                            type="date"
                            name={"startDate"}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                            />
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Date De Fin
                            </label>
                            <input
                            type={"date"}
                            name={"endDate"}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                            />
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Description
                            </label>
                            <textarea
                            name={"reason"}
                            placeholder={"Des Raisons"}
                            // value={leave.reason}
                            onChange={handleChange}
                            className={"w-full border border-gray-300 rounded-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            ></textarea>
                        </div>
                    </div>
                    <button
                        type={"submit"}
                        className={"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"}
                    >Ajouter La Demande</button>
                </div>
            </form>
        </div>
    );
};

export default Add;