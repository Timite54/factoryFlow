import React, {useEffect, useState} from 'react';
import {fetchDepartments, getEmployees} from "../../utils/EmployeeHelper.jsx";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        salary: 0,
        deductions: 0,
        payDate: null,
    });
    const [formData, setFormData] = useState({});
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        const getDepartments = async () => {
            try {
                const departments = await fetchDepartments();
                setDepartments(departments)
            } catch (error) {
                console.error("Erreur de chargement des départements", error);
                setDepartments([])
            }
        }
        getDepartments()
    }, []);

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value);
        setEmployees(emps);
    }

    // useEffect( () => {
    //     const fetchEmployees  = async () => {
    //         let employees
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:3000/api/employee/${id}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${localStorage.getItem('token')}`
    //                     }
    //                 })
    //             if (response.data.success) {
    //                 employees = response.data.employees
    //             }
    //         }catch (error) {
    //             console.error(error);
    //             if (error.response && !error.response.data.error)
    //                 alert(error.response.data.error);
    //         }
    //     }
    //     fetchEmployees();
    // }, []);


    const handleChange = (e) => {
        const {name, value } = e.target;
        setSalary((prevData) =>({...prevData, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:3000/api/salary/add`,
                salary,
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
        <>{departments ? (
            <div className={"max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md"}>
                <h2 className={"text-2xl font-bold mb-6"}>Ajout De Salaire</h2>
                <form onSubmit={handleSubmit}>
                    <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Département D'apartenance
                            </label>
                            <select
                                name={"department"}
                                onChange={handleDepartment}
                                className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                                required
                            >
                                <option value={""}>Selectionnez Département</option>
                                {departments.map((dep) => (
                                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Employé(e)
                            </label>
                            <select
                                name={"employeeId"}
                                onChange={handleChange}
                                className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                                required
                            >
                                <option value={""}>Selectionnez l'Employé</option>
                                {employees.map((emp) => (
                                    <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Salaire De Base
                            </label>
                            <input
                                type={"number"}
                                name={"basicSalary"}
                                onChange={handleChange}
                                placeholder={"Salaire De Base"}
                                className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                                required
                            />
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Indemnités
                            </label>
                            <input
                                type={"number"}
                                name={"allowances"}
                                onChange={handleChange}
                                placeholder={"Indemnité "}
                                className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                                required
                            />
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Déductions
                            </label>
                            <input
                                type={"number"}
                                name={"deductions"}
                                onChange={handleChange}
                                placeholder={"Déductions"}
                                className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                                required
                            />
                        </div>
                        <div>
                            <label className={"block text-sm font-medium text-gray-700"}>
                                Date De Paiement
                            </label>
                            <input
                                type={"date"}
                                name={"payDate"}
                                onChange={handleChange}
                                 className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type={"submit"}
                        className={"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"}
                    >
                        Ajouter Le Salaire
                    </button>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
};

export default Add;