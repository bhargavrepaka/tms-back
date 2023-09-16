import jwt from "jsonwebtoken";
import {User} from "../models/UsersModel.js";
export const isAuth =async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const decoded =await jwt.verify(token, process.env.JWT_SECRET);
        const user =await User.findOne({ where: { id: decoded.id, email: decoded.email } });
        if (!user) {
            return res.status(404).json({ message: "Authorization denied" });
        }
        req.user = user;
        next();
    } catch (error) {
        //(error);
        res.status(400).json({ message: "Token is not valid" });
    }
}