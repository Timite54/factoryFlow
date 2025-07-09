import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
    const {id} = useParams();
    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setDepartment({
            ...department,
            [name]: value
        })
    }
    useEffect(() => {
        const fetchDepartments  = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            }catch (error) {
                console.error(error);
                if (error.response && !error.response.data.error)

                    alert(error.response.data.error);
            }finally {
                setLoading(false);
            }
        }
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3000/api/department/${id}`,
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
                console.log(error.response.data.error);
        }
    }

    return (
        <>{loading ? <div>loading...</div> :
        <div className={"max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96"}>
            <div>
                <h2 className={"text-2xl font-bold mb-6"}>Edit  Department</h2>
                {/*{error && <p className="text-red-500 mb-4">{error}</p>}*/}
                <form onSubmit={handleSubmit  }>
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
                    <button className={"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"}>Edit  Department</button>
                </form>
            </div>
        </div>
        }</>

    );
};

export default EditDepartment;