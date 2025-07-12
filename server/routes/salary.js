import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import {addSalary, getSalary} from "../controllers/salaryController.js";

const router = express.Router();

// router.get("/", authMiddleware, getDepartments )
router.post("/add", authMiddleware, addSalary )
router.get("/:id", authMiddleware, getSalary )
// router.put("/:id", authMiddleware, updateDepartment )
// router.delete("/:id", authMiddleware, deleteDepartment )


export default router;