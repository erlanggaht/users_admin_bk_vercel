import { Sequelize } from "sequelize";
import mysql2 from 'mysql2'

const users_admin = new Sequelize('users_admin','erlanggaht','@sumedang12',{
    host : "db4free.net",
    dialect : "mysql",
    dialectModule : mysql2
    })


    

export default users_admin;
