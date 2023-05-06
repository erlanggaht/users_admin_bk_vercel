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
var allowedOrigins = ['http://localhost:3000','https://users-admin.vercel.app'];

try {
    await users_admin.authenticate()
    console.log('berhasil konek ke database')
} catch (error) {
    console.error('Unable to connect to the database:', error); 
}


app.use(cookieParser())

app.use(cors({
  origin: function(origin, callback){    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }    return callback(null, true);
  },
  credentials : true
}));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)




app.listen(port,()=>{
    console.log(`berhasil konek di port ${port}`)
})
