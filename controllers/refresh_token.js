import admin_table from "../models/user_model.js";
import jwt from 'jsonwebtoken'

export default async function RefreshToken(req,res) {
  try {

    const CookiesrefreshToken = req.cookies.RefreshToken
    if(!CookiesrefreshToken) return res.sendStatus(401);
    const user = await admin_table.findAll({
        where : {
            refresh_token : CookiesrefreshToken
        }
    }) 
    if(!user[0]) return res.sendStatus(401);

    const authorizationRefreshToken = req.headers["authorization"];
    const getToken = authorization && authorization.split(" ")[1];
    const tokenjwt_decode = await jwt.decode(getToken)
    if(getToken) {
    const userRefToken = await admin_table.update({refresh_token:authorizationRefreshToken},{
        where : {
            email: tokenjwt_decode.email
        }
    }) 
    if(!userRefToken[0]) return res.sendStatus(401);

    }
   

    jwt.verify(CookiesrefreshToken,process.env.KEY_REFRESH_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(401);
        const nama = user[0].nama
        const id = user[0].id
        const email = user[0].email
        const accesstoken = jwt.sign({nama,id,email},process.env.KEY_ACCESS_TOKEN,{
            expiresIn : '15s'
        })
        const refreshToken = jwt.sign({nama,id,email},process.env.KEY_REFRESH_TOKEN,{
          expiresIn : '1d'
        })
        res.json({accesstoken,refreshToken})
    })

    if(getToken){
      jwt.verify(getToken,process.env.KEY_REFRESH_TOKEN,(err,decoded)=>{
        if(err) return res.sendStatus(401);
        const nama = user[0].nama
        const id = user[0].id
        const email = user[0].email
        const accesstoken = jwt.sign({nama,id,email},process.env.KEY_ACCESS_TOKEN,{
            expiresIn : '15s'
        })
        const refreshToken = jwt.sign({nama,id,email},process.env.KEY_REFRESH_TOKEN,{
          expiresIn : '1d'
        })
        res.json({accesstoken,refreshToken})
    })
    }
  } catch (error) {
    console.log(error)
  }
}
