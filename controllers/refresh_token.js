import admin_table from "../models/user_model.js";
import jwt from 'jsonwebtoken'



export default async function RefreshToken(req,res) {
  try {
    const CookiesrefreshTokenT = req.cookies.Refreshoken
    if(!CookiesrefreshToken) return res.sendStatus(401);
    const user = await admin_table.findAll({
        where : {
            refresh_token : CookiesrefreshToken
        }
    }) 
    if(!user[0]) return res.sendStatus(401);
    jwt.verify(CookiesrefreshToken,process.env.KEY_REFRESH_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(401);
        const nama = user[0].nama
        const id = user[0].id
        const email = user[0].email
        const accesstoken = jwt.sign({nama,id,email},process.env.KEY_ACCESS_TOKEN,{
            expiresIn : '15s'
        })
          res.setHeader('Access-Control-Allow-Credentials', true)

  res.setHeader('Access-Control-Allow-Origin', '*')

  // another common pattern

  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')

  res.setHeader(

    'Access-Control-Allow-Headers',

    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'

  )
        res.json({accesstoken})
    })
  } catch (error) {
    console.log(error)
  }
}
