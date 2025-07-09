import React, {useEffect, useState} from 'react';
import {fetchDepartments} from "../../utils/EmployeeHelper.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Add = () => {
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});
    const [gender, setGender] = useState("");
    const navigate = useNavigate();


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

    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === "image") {
            setFormData((prevData) => ({
                ...prevData  ,
                [name]: files[0]
            }))
        } else {
            setFormData((prevData) =>({
                ...prevData,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key]);
        })

        try {
            const response = await axios.post(
                "http://localhost:3000/api/employee/add",
                formDataObj,
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
        <div className={"max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md"}>
            <h2 className={"text-2xl font-bold mb-6"}>Ajouter uUn Employé</h2>
            <form onSubmit={handleSubmit}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Nom
                        </label>
                        <input
                            type={"text"}
                            name={"name"}
                            onChange={handleChange}
                            placeholder={"Nom De L'Employé"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Email
                        </label>
                        <input
                            type={"email"}
                            name={"email"}
                            onChange={handleChange}
                            placeholder={"Entrez Son Email"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Identifiant Employé
                        </label>
                        <input
                            type={"text"}
                            name={"employeeId"}
                            onChange={handleChange}
                            placeholder={"Entrez Son Identifiant"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Date De Naissance
                        </label>
                        <input
                            type={"date"}
                            name={"dob"}
                            onChange={handleChange}
                            placeholder={"Entrez Sa Date De Naissance"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Genre
                        </label>
                        <select
                            name={"gender"}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required

                        >
                            <option value={""} className={"hover:text-teal-800"}>Selectionnez Son Genre</option>
                            <option value={"male"}>Masculin</option>
                            <option value={"female"}>Feminin</option>
                        </select>
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Statut Matrimonial
                        </label>
                        <select
                            name={"maritalStatus"}
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
                            onChange={handleChange}
                            placeholder={"Désignation"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Département D'apartenance
                        </label>
                        <select
                            name={"department"}
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
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Salaire
                        </label>
                        <input
                            type={"number"}
                            name={"salary"}
                            onChange={handleChange}
                            placeholder={"Entrez Salaire"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Mot de Passe
                        </label>
                        <input
                            type={"password"}
                            name={"password"}
                            placeholder={"********"}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Rôle
                        </label>
                        <select
                            name={"role"}
                            onChange={handleChange}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        >
                            <option value={""}>Selectionnez Rôle</option>
                            <option value={"admin"}>Administrateur</option>
                            <option value={"employee"}>Employé</option>
                        </select>
                    </div>
                    <div>
                        <label className={"block text-sm font-medium text-gray-700"}>
                            Image De Profile
                        </label>
                        <input
                            type={"file"}
                            name={"image"}
                            onChange={handleChange}
                            placeholder={"Image De Profile"}
                            accept={"image/*"}
                            className={"mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:te xt-sm"}
                            required
                        />
                    </div>
                </div>
                <button
                    type={"submit"}
                    className={"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"}
                >
                    Ajouter L'Employé(e)
                </button>
            </form>
        </div>
    );
};

export default Add;