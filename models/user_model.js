import { DataTypes } from "sequelize";
import users_admin from "../database/config.js";


const admin_table = users_admin.define('admin_table',{
    nama : DataTypes.STRING,
    email :  DataTypes.STRING,
    password :DataTypes.STRING,
     refresh_token : DataTypes.TEXT,
},{
    freezeTableName : false
})


export default admin_table;



// (async () => {

//     users_admin.sync()
//     await admin_table.sync()
// })()