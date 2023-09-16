import { sendMail } from "../helpers/mailHelper.js";
import { User } from "../models/UsersModel.js"

export const fecthAllUsers = async (req, res) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(401).json({ message: "Not authorized" });
        }
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching all users" });
    }
}

export const updateUser = async (req, res) => {
    try {
        const {uid} = req.params;
        const user = await User.findByPk(uid);
        if(user){
            const newUser = await user.update(req.body);
            const mailtext = `Your role is updated by ${req.user.email} to ${newUser.role}. Please check in the dashboard for more details.`;
            sendMail("roleupdate", newUser.email, mailtext, req.user.email);
            return res.status(200).json(newUser.dataValues);
        }
        return res.status(404).json({message: "User not found"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while updating the user" });
    }
}

