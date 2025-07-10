import React, {useEffect, useState} from 'react';
import {fetchDepartments} from "../../utils/EmployeeHelper.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: "",
        department: "",
    });
    const [formData, setFormData] = useState({});
    const [departments, setDepartments] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect( () => {
        const getDepartments = async () => {
            try {
                const departments = await fetchDepartments();
                setDepartments(departments)
            } catch (error) {
            }
        }
        getDepartments()
    }, []);

    useEffect( () => {
        const fetchEmployee  = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                if (response.data.success) {
                    const employee = response.data.employee
                    setEmployee({
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        designation: employee.designation,
                        salary: employee.salary,
                        department: employee.department,
                    })
                }
            }catch (error) {
                console.error(error);
                if (error.response && !error.response.data.error)

                    alert(error.response.data.error);
            }
        }
        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const {name, value } = e.target;
            setEmployee((prevData) =>({...prevData, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:3000/api/employee/${id}`,
                employee,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            if (response.data.success) {
                navigate("/admin-dashboard/employees");
            }
        } catch (error) {
            console.error(error);
            if (error.response && !error.response.data.error.success)
                alert(error.response.data.error);
        }
    }

    return (
        <>{departments && employee ? (
        <div className={"max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md"}>
            <h2 className={"text-2xl font-bold mb-6"}>Edition d'un Employé</h2>
            <form onSubmit={handleSubmit}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Nom
                        </label>
                        <input
                            type={"text"}
                            name={"name"}
                            value={employee?.name}
                            onChange={handleChange}
                            placeholder={"Nom De L'Employé"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Statut Matrimonial
                        </label>
                        <select
                            name={"maritalStatus"}
                            value={employee.maritalStatus}
                            onChange={handleChange}
                            // placeholder={"Son Statut Matrimonial"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        >
                            <option value={""}>Son Statut Matrimonial</option>
                            <option value={"single"}>Célibataire</option>
                            <option value={"married"}>Marié(e)</option>
                        </select>
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Désignation
                        </label>
                        <input
                            type={"text"}
                            name={"designation"}
                            value={employee.designation}
                            onChange={handleChange}
                            placeholder={"Désignation"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Salaire
                        </label>
                        <input
                            type={"number"}
                            name={"salary"}
                            value={employee.salary}
                            onChange={handleChange}
                            placeholder={"Entrez Salaire"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div className={"col-span-2"}>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Département D'apartenance
                        </label>
                        <select
                            name={"department"}
                            value={employee.department}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        >
                            <option value={""}>Selectionnez Département</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>

                </div>
                <button
                    type={"submit"}
                    className={"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"}
                >
                    Enregistrer
                </button>
            </form>
        </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Edit;