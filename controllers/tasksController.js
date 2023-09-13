import { sendMail } from "../helpers/mailHelper.js";
import { Task } from "../models/TasksModel.js";

//only if admin
export const fetchAllTasks = async (req, res) => {
    try {
        if(req.user.role!=='admin'){
            return res.status(401).json({ message: "Not authorized" });
        }
        const tasks = await Task.findAll();
        const assignedTasks = tasks.filter(task => task.status === "assigned")
        const doneTasks = tasks.filter(task => task.status === "done")
        const inprogress = tasks.filter(task => task.status === "inprogress")

        return res.status(200).json({tasks,assignedTasks:assignedTasks.length,doneTasks:doneTasks.length,inprogressTasks:inprogress.length});
    } catch (error) {
       return  res.status(404).json({ message: error.message });
    }
}
//only if admin

export const addTask = async (req, res) => {
    const task = req.body;
    console.log(task)
    try {
        if(req.user.role!=='admin'){
            return res.status(401).json({ message: "Not authorized" });
        }
        const newTask = await Task.create(task);
        const mailText=`New Task '${newTask.title}' is assigned to you and the deadline is by ${newTask.deadline}. Please check in the dashboard for more details.`
        sendMail("newtask",newTask.assignedTo,mailText,newTask.assignedBy)
        return res.status(201).json(newTask);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const updateTask = async (req, res) => {
    const { tid } = req.params;
    console.log(tid);
    console.log(req.body);
    try {
        const updatedTask = await Task.findOne({ where: { id:tid }});
        const newTask=await updatedTask.update(req.body);
        const mailText=`The task ${newTask.id} is updated by ${req.user.email}. Please check in the dashboard for more details.`
        const mailReceiver= req.user.role==='admin'?newTask.assignedTo:newTask.assignedBy 
        sendMail("taskupdate",mailReceiver,mailText,req.user.email)
        return res.status(200).json(newTask.dataValues);
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}

export const fetchUserTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { assignedTo:req.user.email } });
        const assignedTasks = tasks.filter(task => task.status === "assigned")
        const doneTasks = tasks.filter(task => task.status === "done")
        const inprogress = tasks.filter(task => task.status === "inprogress")
        return res.status(200).json({tasks,assignedTasks:assignedTasks.length,doneTasks:doneTasks.length,inprogressTasks:inprogress.length});
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
