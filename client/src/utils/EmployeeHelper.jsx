import axios from "axios";
import {useNavigate} from "react-router-dom";

export const columns = [
    {
        name: "#",
        selector: (row) => row.sno,
        width: "70px",
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "185px",
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "90px",
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        sortable: true,
        width: '120px'
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "190px",
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center : "true",
    }

]


export const fetchDepartments = async () => {
    let departments
    try {
        const response = await axios.get('http://localhost:3000/api/department',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
        if (response.data.success) {
            departments = response.data.departments;
        }
    }catch (error) {
        console.error(error);
        if (error.response && !error.response.data.error.success)
            alert(error.response.data.error);
    }
    return departments;
}

export const EmployeeButtons = ({_id}) =>{
    const navigate = useNavigate();
    // const handleDelete = async (id) => {
    //     const confirm = window.confirm("Voulez-vous Supprimer Ce department?");
    //     if (confirm) {
    //         try {
    //             const response = await axios.delete(`http://localhost:3000/api/department/${id}`,
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${localStorage.getItem('token')}`
    //                     }
    //                 })
    //             if (response.data.success) {
    //                 onDepartmentDelete(id)
    //             }
    //         } catch (error) {
    //             console.error(error);
    //             if (error.response && !error.response.data.error)
    //
    //                 alert(error.response.data.error);
    //         }
    //     }
    // }
    return(
        <div className={"flex gap-1"}>
            <button
                className={"px-4 py-2 bg-teal-600 rounded-md text-white"}
                onClick={() => navigate(`/admin-dashboard/employee/${_id}`)}
            >Voir</button>
            <button className={"px-4 py-2 bg-blue-600 rounded-md text-white"}
                    onClick={() => navigate(`/admin-dashboard/employee/edit/${_id}`)}
            >Editer</button>
            <button className={"px-4 py-2 bg-yellow-600 rounded-md text-white"}
                    // onClick={() => handleDelete(_id)}
            >salaire</button>
            <button className={"px-4 py-2 bg-red-600 rounded-md text-white"}
                    // onClick={() => handleDelete(_id)}
            >Congé</button>
        </div>
    )
}
