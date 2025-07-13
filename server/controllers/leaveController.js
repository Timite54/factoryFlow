import Leave from "../models/Leave.js";
import Employee from "../models/Employee.js";

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, startDate, endDate, reason} = req.body;
        if (!userId || !leaveType || !startDate || !endDate) {
            return res.status(400).json({ error: "Tous les champs sont requis" });
        }
        const employee = await Employee.findOne({userId})
        if (!employee) return res.status(404).json({ success: false, error: "Employé non trouvé" });


        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save();
        return res.status(200).json({success: true, leave: newLeave});
    }catch (error) {
        return res.status(500).json({success: false, error: "Add Leave Server Error"});
    }
}

const getLeaves = async (req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findOne({userId: id})

        const leaves = await Leave.find({employeeId: employee._id})
        return res.status(200).json({success: true, leaves})

    }catch (error) {
        return res.status(500).json({success: false, error: "Get Leave Server Error"});
    }
}

export { addLeave, getLeaves }