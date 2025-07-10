import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const View = () => {
    const {id} = useParams();
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const fetchEmployee  = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/employee/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                if (response.data.success) {
                    setEmployee(response.data.employee)
                }
            }catch (error) {
                console.error(error);
                if (error.response && !error.response.data.error)

                    alert(error.response.data.error);
            }
        }
        fetchEmployee();
    }, []);

     return (
        <div className={"max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md"}>
            {employee?.userId && (
                <h2 className={"text-2xl font-bold mb-8 text-center"}>
                    Détails sur {employee?.userId?.name}
                </h2>
            )}
            {/*<h2 className={"text-2xl font-bold mb-8 text-center"}>*/}
            {/*    Details Sur{employee.userId.name}*/}
            {/*</h2>*/}
            <div className={"grid grid-cols-1 md:grid-cols-2"}>
                <div>
                    {employee?.userId?.profileImage && (
                        <img src={`http://localhost:3000/${employee?.userId?.profileImage}`} alt="profileImage" className={"rounded-full w-72 border"} />
                    )}
                    {/*<img src={`http://localhost:3000/${employee?.userId?.profileImage}`} alt="profileImage" className={"w-10 h-10 rounded-full"}/>*/}
                </div>
                <div>
                    <div className={"flex space-x-3 mb-5"}>
                        <p className={"text-lg font-bold"}>Name:</p>
                        <p className={"font-medium"}>{employee?.userId?.name}</p>
                    </div>
                </div>
                <div>
                    <div className={"flex space-x-3 mb-5"}>
                        <p className={"text-lg font-bold"}>Employé ID:</p>
                        <p className={"font-medium"}>{employee?.employeeId}</p>
                    </div>
                </div>
                <div className={"flex space-x-3 mb-5"}>
                    <p className={"text-lg font-bold"}>Date Of Birth:</p>
                    <p className={"font-medium"}>{new Date(employee?.dob).toLocaleDateString()}</p>
                </div>
                <div>
                    <div className={"flex space-x-3 mb-5"}>
                        <p className={"text-lg font-bold"}>Gender:</p>
                        <p className={"font-medium"}>{employee?.gender}</p>
                    </div>
                </div>
                <div>
                    <div className={"flex space-x-3 mb-5"}>
                        <p className={"text-lg font-bold"}>Department:</p>
                        <p className={"font-medium"}>{employee?.department?.dep_name}</p>
                    </div>
                </div>
                <div>
                    <div className={"flex space-x-3 mb-5"}>
                        <p className={"text-lg font-bold"}>Situation Matrimoniale:</p>
                        <p className={"font-medium"}>{employee?.maritalStatus}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default View;