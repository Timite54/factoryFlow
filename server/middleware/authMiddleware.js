import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({success: false, error: "Token not provided"});
        }
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        if (!decodedToken) {
            return res.status(401).json({success: false, error: "Invalid token"});
        }
        // const user = await User.findById({_id: decodedToken._id}).select("-password");
        const user = await User.findById(decodedToken._id).select("-password");
        if (!user) {
            return res.status(404).json({success: false, error: "User not found"});
        }
        req.user = user;
        next();
    }catch (error) {
        console.error("AUTH ERROR:", error); // ✅ log utile
        return res.status(500).json({success: false, error: "server error"});

        
    }
}
export default authMiddleware;