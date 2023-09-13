import { DataTypes, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({
    path: "./config.env"
})
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS ,{
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port:process.env.DB_PORT
    }
)

sequelize.authenticate().then(() => {
   console.log('MYSQL DB Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the MYSQL database: ', error);
});



