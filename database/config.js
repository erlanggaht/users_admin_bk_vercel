import { Sequelize } from "sequelize";

const users_admin = new Sequelize('users_admin','erlanggaht','@sumedang12',{
    host : "www.db4free.net",
    dialect : "mysql"
    })


    

export default users_admin;