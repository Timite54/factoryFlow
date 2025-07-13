import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import DataTable from "react-data-table-component";
import {columns} from "../../utils/EmployeeHelper.jsx";
import axios from "axios";
import {useAuth} from "../../context/authContext.jsx";

const List = () => {
    const [leaves, setLeaves] = useState([]);
    const {user} = useAuth();
    let sno = 1;

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/leave/${user._id}`,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            if (response.data.success) {
                setLeaves(response.data.leaves)
                // setFilteredSalaries(response.data.salary)
            }
        }catch (error) {
            console.error(error);
            if (error.response && !error.response.data.error) {
                alert(error.response.data.error);
            }
        }
    }

    useEffect(() => {
        fetchLeaves();
    }, [])

    return (
        <div className={"p-6"}>
            <div className={"text-center"}>
                <h2 className={"text-3xl font-bold"}>Gestion Des Congés</h2>
            </div>
            <div className={"flex justify-between items-center"}>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className={"px-4 py-0.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"}
                    // onChange={handleFilterEmployees}
                />
                <Link
                    to={"/employee-dashboard/add-leave"}
                    className={"px-4 py-1.5 bg-teal-600 rounded-md text-white"}>
                    Demander Un Congé
                </Link>
            </div>
            <div className={"overflow-x-auto p-5"}>
                {/*<div className={"text-center"}>*/}
                {/*    <h2 className={"text-2xl font-bold"}>Historique Des Salaires</h2>*/}
                {/*</div>*/}
                {/*<div className={"flex justify-end my-3"}>*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="Rechercher..."*/}
                {/*        className={"px-4 py-0.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"}*/}
                {/*        // onChange={filterSalaries}*/}
                {/*    />*/}
                {/*</div>*/}

                    <table className={"w-full text-sm text-left text-gray-500 border-collapse"}>
                        <thead className={"text-xs text-gray-700 uppercase border border-gray-300"}>
                        <tr>
                            <th className={"px-4 py-2"}>#</th>
                            <th className={"px-4 py-2"}>Motif</th>
                            <th className={"px-4 py-2"}>Début</th>
                            <th className={"px-4 py-2"}>Fin</th>
                            <th className={"px-4 py-2"}>Description</th>
                            {/*<th className={"px-4 py-2"}>Date Demande</th>*/}
                            <th className={"px-4 py-2"}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(leaves) && leaves.map((leave) => (
                                <tr
                                    key={leave._id}
                                    className={"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"}
                                >
                                    <td className={"px-6 py-3 whitespace-nowrap"}>{sno++}</td>
                                    <td className={"px-6 py-3 whitespace-nowrap"}>
                                        {leave.leaveType || "N/A"}
                                    </td>
                                    <td className={"px-6 py-3 whitespace-nowrap"}>{new Date (leave.startDate).toLocaleDateString()}</td>
                                    <td className={"px-6 py-3 whitespace-nowrap"}>{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td className={"px-6 py-3"}>{leave.reason}</td>
                                    <td className={"px-6 py-3"}>{leave.status}</td>
                                    {/*<td className={"px-6 py-3"}>*/}
                                    {/*    {new Date(leave.appliedAt).toLocaleDateString()}*/}
                                    {/*</td>*/}
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>

            {/*<div className={""}>*/}
            {/*    <DataTable columns={columns} data={filteredEmployees} pagination/>*/}
            {/*</div>*/}
        </div>

    )
}
export default List;