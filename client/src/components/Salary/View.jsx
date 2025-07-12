import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

const View = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState(null);
    let {id} = useParams();
    let sno = 1
    const fetchSalaries = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/salary/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                setSalaries(response.data.salary)
                setFilteredSalaries(response.data.salary)
            }
        }catch (error) {
            console.error(error);
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    useEffect(() => {
        fetchSalaries();
    }, [])

    const filterSalaries = (q) => {
        const filteredRecords = salaries.filter( (leave) =>
            leave.employeeId?.employeeId?.toLocaleLowerCase().includes(q.toLowerCase())
        );
        setFilteredSalaries(filteredRecords);
    }

    return (
        <>
            {filteredSalaries === null ? (
                <div>loading...</div>
            ): (
                <div className={"overflow-x-auto p-5"}>
                    <div className={"text-center"}>
                        <h2 className={"text-2xl font-bold"}>Historique Des Salaires</h2>
                    </div>
                    <div className={"flex justify-end my-3"}>
                        <input
                        type="text"
                         placeholder="Rechercher..."
                         className={"px-4 py-0.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"}
                         onChange={filterSalaries}
                        />
                    </div>

                    {filteredSalaries.length > 0 ? (
                        <table className={"w-full text-sm text-left text-gray-500 border-collapse"}>
                            <thead className={"text-xs text-gray-700 uppercase border border-gray-300"}>
                            <tr>
                                <th className={"px-4 py-2"}>#</th>
                                <th className={"px-4 py-2"}>Emp ID</th>
                                <th className={"px-4 py-2"}>Salaire</th>
                                <th className={"px-4 py-2"}>Indemnité</th>
                                <th className={"px-4 py-2"}>Dédommagement</th>
                                <th className={"px-4 py-2"}>Totale</th>
                                <th className={"px-4 py-2"}>Date De Paie</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                filteredSalaries.map((salary) => (
                                    <tr
                                        key={salary._id}
                                        className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"}
                                    >
                                        <td className={"px-6 py-3 whitespace-nowrap"}>{sno++}</td>
                                        <td className={"px-6 py-3 whitespace-nowrap"}>
                                            {salary.employeeId?.employeeId || "N/A"}
                                        </td>
                                        <td className={"px-6 py-3 whitespace-nowrap"}>{salary.basicSalary}</td>
                                        <td className={"px-6 py-3 whitespace-nowrap"}>{salary.allowances}</td>
                                        <td className={"px-6 py-3"}>{salary.deductions}</td>
                                        <td className={"px-6 py-3"}>{salary.netSalary}</td>
                                        <td className={"px-6 py-3"}>
                                            {new Date(salary.payDate).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        ) : <div>Aucun Salaire Trouvé Pour Ce Employé</div>}
                </div>
            )}
        </>
    );
};

export default View;