import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: "",
        description: ""
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({
            ...department,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3000/api/department/add",
                department,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            console.error(error);
            if (error.response && !error.response.data.error.success)
                alert(error.response.data.error);
        }
    }
    return (
        <div className={"max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96"}>
            <div>
                <h2 className={"text-2xl font-bold mb-6"}>Add Department</h2>
                {/*{error && <p className="text-red-500 mb-4">{error}</p>}*/}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="dept_ame"
                            className={"block text-sm font-medium text-gray-700"}>
                            Department Name
                        </label>
                        <input
                            type="text"
                            name="dep_name"
                            value={department.dep_name}
                            onChange={handleChange}
                            placeholder="Enter Dept Name"
                            className={"mt-1 w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="decription"
                            className={"block mt-2 text-sm font-medium text-gray-700"}>
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={department.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className={"mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            rows={4}>
                        </textarea>
                    </div>
                    <button className={"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"}>Add Department</button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;