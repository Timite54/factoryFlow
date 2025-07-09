import {useNavigate} from "react-router-dom";
import axios from "axios";

export const columns = [
    {
        name: "#",
        selector: (row) => row.sno,
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
    }

]

export const DepartmentButtons = ({_id, onDepartmentDelete}) =>{
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        const confirm = window.confirm("Voulez-vous Supprimer Ce department?");
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/department/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                if (response.data.success) {
                    onDepartmentDelete(id)
                }
            } catch (error) {
                console.error(error);
                if (error.response && !error.response.data.error)

                    alert(error.response.data.error);
            }
        }
    }
    return(
        <div className={"flex gap-2"}>
            <button
                className={"px-6 py-1.5 bg-teal-600 rounded-md text-white"}
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >Edit</button>
            <button className={"px-4 py-1.5 bg-red-600 rounded-md text-white"}
                    onClick={() => handleDelete(_id)}
            >Delete</button>
        </div>
    )
}