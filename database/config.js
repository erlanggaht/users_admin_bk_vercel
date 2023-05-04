import { Sequelize } from "sequelize";
<<<<<<< HEAD
import mysql2 from 'mysql2'
=======
import mysql2 from 'mysql2'; 
>>>>>>> dc9aacd6388a87ffb312b1183661543451420180

const users_admin = new Sequelize('users_admin','erlanggaht','@sumedang12',{
    host : "www.db4free.net",
    dialect : "mysql",
<<<<<<< HEAD
    dialectModule : mysql2
=======
    dialectModule: mysql2
>>>>>>> dc9aacd6388a87ffb312b1183661543451420180
    })


    

export default users_admin;
