import express from "express"
import "./models/db.js"
import { sequelize } from "./models/db.js"
import TasksRoute from './routes/tasksRoute.js'
import AuthRoute from './routes/authRoute.js'
import UserRoute from "./routes/usersRoute.js"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { Task } from "./models/TasksModel.js"
import { Comment } from "./models/CommentsModel.js"

const app = express()



//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dotenv.config({
    path: "./config.env"
})



//routes
app.use("/tasks", TasksRoute)
app.use("/auth",AuthRoute)
app.use("/users",UserRoute)

//listen events

Task.hasMany(Comment,{
    as:'comment',
})
Comment.belongsTo(Task,{
   as:'task', 
})

sequelize.sync({ force: false}).then(() => {
    console.log(` ALL Database & tables created!`)
}).catch((error) => {
    console.log(`Error creating tables: ${error}`)
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT)
})