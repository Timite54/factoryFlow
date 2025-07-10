import User from "../models/User.js";
import Employee from "../models/Employee.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role
        } = req.body;

        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({success: false, error: "User Already Registered In Employee"});
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            role,
            profileImage: req.file ? req.file.filename : "",
        })
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
                userId: savedUser._id,
                employeeId,
                dob,
                gender,
                maritalStatus,
                designation,
                department,
                salary,
            }
        )
        await newEmployee.save();
        return res.status(201).json({success: true, employee: newEmployee, message: "Employee Created Successfully"});

    }catch (error) {
        // return res.status(500).json({success: false, error: "Adding Employee Server Error"});?
        console.error("ERROR ADD EMPLOYEE:", error);
        return res.status(500).json({success: false, error: error.message});

    }

}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate("userId", {password: 0}).populate("department");
        return res.status(200).json({success: true, employees: employees});
    }catch (error) {
        return res.status(500).json({success: false, error: "Get Employees Server Error"});
    }

}

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findById(id).populate("userId", {password: 0}).populate("department");
        return res.status(200).json({success: true, employee: employee});
    }catch (error) {
        return res.status(500).json({success: false, error: "Get Employee Server Error"});
    }
}

const updateEmployee = async (req, res) => {
    try {
        const {id} = req.params
        const { name, maritalStatus, designation, department, salary } = req.body;

        const employee = await Employee.findById({_id: id})
        if (!employee) {
            return res
                .status(404)
                .json({success: false, error: "Employee Not Found"});
        }

        const user = await User.findById({_id: employee.userId})
        if (!user) {
            return res
                .status(404)
                .json({success: false, error: "User Not Found"});
        }

        const updateUser = await User.findByIdAndUpdate(
        {_id: employee.userId}, {name})
        const updateEmployee= await Employee.findByIdAndUpdate(
            {_id: id},
            { maritalStatus, designation, department, salary }
        )

        if (!updateUser || !updateEmployee) {
            return res
                .status(404)
                .json({success: false, error: "Document Not Found"});
        }
        return res.status(200).json({
            success: true,
            employee: {updateEmployee, updateUser},
            message: "Employee Updated Successfully"
        });
    }catch (error) {
        return res.status(500).json({success: false, error: "Update Employee Server Error"});

    }
}

export {addEmployee, upload, getEmployees, getEmployee, updateEmployee};