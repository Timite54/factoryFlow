import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        return res.status(200).json({success: true, departments});
    }catch (error) {
        return res.status(500).json({success: false, error: "Get Department Server Error"});
    }
}

const addDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const newDep = new Department({
            dep_name,
            description
        });
        console.log('req.body:', req.body);
        await newDep.save();
        return res.status(201).json({success: true, department: newDep});
    }catch (error) {
        console.error('[AddDepartment ERROR]', error); // ✅ affiche l’erreur complète dans la console
        return res.status(500).json({success: false, error: "Add Department Server Error"});
    }
}

const getDepartment  = async (req, res) => {
     try {
         const {id} = req.params
         const department = await Department.findById({_id: id})
         return res.status(200).json({success: true, department});
     } catch (error) {
         return res.status(500).json({success: false, error: "Get Department Id Server Error"});
     }
}

const updateDepartment = async (req, res) => {
    try {
        const {id} = req.params
        const {dep_name, description} = req.body
        const  updateDep = await  Department.findByIdAndUpdate({_id:  id},{
            dep_name: dep_name,
            description: description,
        })
        return res.status(200).json({success: true, department: updateDep});
    }catch (error) {
        return res.status(500).json({success: false, error: "Update Department Server Error"});
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params
        const deleteDep = await Department.findByIdAndDelete({_id: id})
        return res.status(200).json({success: true, department: deleteDep});
    }catch (error) {
        return res.status(500).json({success: false, error: "Delete Department Server Error"});
    }

}

export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };