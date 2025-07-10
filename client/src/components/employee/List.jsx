import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import {DepartmentButtons} from "../../utils/DepartementHelper.jsx";
import {EmployeeButtons, columns} from "../../utils/EmployeeHelper.jsx";
import DataTable from "react-data-table-component"


const List = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:3000/api/employee',
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                if (response.data.success) {
                    let sno = 1
                    const data = await response.data.employees.map( (emp) => (
                        {
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department.dep_name,
                            name: emp.userId.name,
                            dob: new Date(emp.dob).toLocaleDateString(),

                            profileImage: <img src={`http://localhost:3000/${emp.userId.profileImage}`} alt="profileImage" className={"w-10 h-10 rounded-full"}/>,
                            action:( <EmployeeButtons _id={emp._id}/>)
                        }
                    ))
                    setEmployees(data)
                    setFilteredEmployees(data);
                }
            }catch (error) {
                console.error(error);
                if (error.response && !error.response.data.error.success)
                    alert(error.response.data.error);
            } finally {
                setLoading(false);
            }
        }
        fetchEmployees ();
    }, []);


    const handleFilterEmployees = (e) => {
        const record = e.target.value.toLowerCase();
        const data = employees.filter( (emp) => emp.name.toLowerCase().includes(record) || emp.dep_name.toLowerCase().includes(record));
        setFilteredEmployees(data);
    }

    return (
        <div className={"p-6"}>
            <div className={"text-center"}>
                <h3 className={"3xl font-bold"}>Gestion Du Personnel</h3>
            </div>
            <div className={"flex justify-between items-center mb-6"}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className={"px-4 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"}
                    onChange={handleFilterEmployees}
                />
                <Link
                    to={"/admin-dashboard/add-employee"}
                    className={"px-4 py-1.5 bg-teal-600 rounded-md text-white"}>
                    Ajouter Un Employé
                </Link>
            </div>
            <div className={""}>
                <DataTable columns={columns} data={filteredEmployees} pagination/>
            </div>
        </div>

);
}

export default List;
