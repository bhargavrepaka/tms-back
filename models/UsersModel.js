import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";

export const User= sequelize.define('Users', {
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING, 
        allowNull: false,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"New"
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Userr"
    },
    phone:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"9999999999"
    }
})

