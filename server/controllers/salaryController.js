import Salary from "../models/Salary.js";

const addSalary = async (req, res) => {
    try {
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body;

        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });
        await newSalary.save();
        return res.status(200).json({success: true, salary: newSalary});
    }catch (error) {
        return res.status(500).json({success: false, error: "Add salary Server Error"});
    }
}

export { addSalary };