import express from "express";
import users_admin from "./database/config.js";
import cors from 'cors'
import router from "./router/user_route.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

dotenv.config()
const app = express()
const port = process.env.PORT || 3002
var allowedOrigins = ['http://localhost:3000/signup','https://users-admin.vercel.app'];

try {
    await users_admin.authenticate()
    console.log('berhasil konek ke database')
} catch (error) {
    console.error('Unable to connect to the database:', error); 
}


app.use(cookieParser())

app.use(cors({
    origin : "http://localhost:3000" ,
  credentials : true
}));



app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)




app.listen(port,()=>{
    console.log(`berhasil konek di port ${port}`)
})
