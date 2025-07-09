import React from 'react';
import SummaryCard from "./SummaryCard.jsx";
import {
    FaBuilding,
    FaCheckCircle,
    FaFileAlt,
    FaHourglassHalf,
    FaMoneyBillWave,
    FaTimesCircle,
    FaUsers
} from "react-icons/fa";

const AdminSummary = () => {
    return (
        <div className={"p-6"}>
            <h3 className={"text-2xl font-bold"}>Aperçu Du Tableau De Bord</h3>
            <div className={"grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"}>
                <SummaryCard icon={<FaUsers />} text={"Effectif Du Personnel"} number={13} color={"bg-teal-600"}/>
                <SummaryCard icon={<FaBuilding />} text={"Effectif Des départements"} number={5} color={"bg-yellow-600"}/>
                <SummaryCard icon={<FaMoneyBillWave />} text={"Salaire Mensuel"} number="$654" color={"bg-red-600"}/>
            </div>
            <div className={"mt-12"}>
                <h4 className={"text-center text-2xl font-bold underline  "}>Détails Sur Les Congés</h4>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"}>
                    <SummaryCard icon={<FaFileAlt />} text={"Congé Demandé"} number={5} color={"bg-teal-600"}/>
                    <SummaryCard icon={<FaCheckCircle />} text={"Congé Approuvé"} number={2} color={"bg-green-600"}/>
                    <SummaryCard icon={<FaHourglassHalf />} text={"Congé En Attente"} number={4} color={"bg-yellow-600"}/>
                    <SummaryCard icon={<FaTimesCircle />} text={"Congé Rejeté"} number={1} color={"bg-red-600"}/>

                </div>

            </div>
        </div>
    );
};

export default AdminSummary;