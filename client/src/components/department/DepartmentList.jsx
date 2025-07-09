import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component"
import {columns, DepartmentButtons} from "../../utils/DepartementHelper.jsx"
import axios from "axios";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDepartmentDelete = async (id) => {
        const data= departments.filter( (dep) => dep._id !== id);
        setFilteredDepartments(data);
    }
    useEffect(() => {
        const fetchDepartments = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/department',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                 if (response.data.success) {
                     let sno = 1
                     const data = await response.data.departments.map( (dep) => (
                         {
                             _id: dep._id,
                             sno: sno++,
                             dep_name: dep.dep_name,
                             action:( <DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)
                         }
                     ))
                     setDepartments(data)
                     setFilteredDepartments(data);
                }
            }catch (error) {
                console.error(error);
                if (error.response && !error.response.data.error.success)
                    alert(error.response.data.error);
            } finally {
                setLoading(false);
            }
        }
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const {value} = e.target;
        const data = departments.filter( (dep) => dep.dep_name.toLowerCase().includes(value.toLowerCase()));
        setDepartments(data);
    }

    return (
        <>{loading ? <div>loading...</div> :
        <div className={"p-6 "}>
            <div className={"text-center"}>
                <h3 className={"3xl font-bold"}>Gestion Des Départements</h3>
            </div>
            <div className={"flex justify-between items-center mb-6"}>
                <input
                    type="text"
                    placeholder="Rechercher Departement"
                    className={"px-4 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"}
                    onChange={filterDepartments}
                />
                <Link
                    to={"/admin-dashboard/add-department"}
                    className={"px-4 py-1.5 bg-teal-600 rounded-md text-white"}>
                    Ajouter Un departement
                </Link>
            </div>
            <div>
                <DataTable columns={columns} data={departments} pagination/>
            </div>
        </div>
        }</>
    );
};

export default DepartmentList;