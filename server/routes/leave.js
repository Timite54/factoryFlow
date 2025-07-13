import express from 'express';
import authMiddleware from "../middleware/authMiddleware.js";
import {addLeave, getLeaves} from "../controllers/leaveController.js";

const router = express.Router();

// router.get("/", authMiddleware, getDepartments )
router.post("/add", authMiddleware, addLeave )
router.get("/:id", authMiddleware, getLeaves )
// router.put("/:id", authMiddleware, updateDepartment )
// router.delete("/:id", authMiddleware, deleteDepartment )


export default router;