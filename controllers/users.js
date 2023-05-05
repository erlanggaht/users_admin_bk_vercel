import admin_table from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const GetUsers = async (req, res) => {
  const users = await admin_table.findAll({
    attributes : ['id','nama','email']
  });
  if (users.length === 0) return res.status(400).json({ msg: "tidak ada data" });
    return res.status(200).json(users);
};

export const Register = async (req, res) => {
  const { nama, password, confirmPassword, email } = req.body;
  if (password !== confirmPassword)
    return res.json({ msg: "confirm password tidak cocok" });
  const salt = await bcrypt.genSalt();
  const password_hash = await bcrypt.hash(password, salt);

  try {
    await admin_table.create({
      nama: nama,
      email: email,
      password: password_hash,
    });
    return res.status(200).json({ msg: "Register berhasil. silahkan login" });
  } catch (error) {
    return res.status(400).json({ msg: "daftar gagal" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await admin_table.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (!user[0]) return res
        .status(401)
        .json({ msg: "email tidak terdaftar atau tidak valid" });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(401).json({ msg: "password salah" });
    const nama = user[0].nama
    const userId = user[0].id
    const email = user[0].email    
    const accesstoken = jwt.sign({nama,userId,email},process.env.KEY_ACCESS_TOKEN,{
        expiresIn : '15s'
    })
    const refreshtoken = jwt.sign({nama,userId,email},process.env.KEY_REFRESH_TOKEN,{
        expiresIn : '1d'
    })
    await admin_table.update({refresh_token:refreshtoken},{
        where : {
            id : userId
        }
    })
    res.cookie('RefreshToken',refreshtoken,{
        maxAge : 86400000,
        httpOnly : true,
        sameSite: 'None', 
        secure: true 
    })
    res.status(200).json({accesstoken})
  } catch (error) {
    console.log({ loginError: "Login error" });
  }

};

export const update = async(req,res) => {
  try {
    const userToken = await admin_table.findAll({where : {
      refresh_token : req.cookies.RefreshToken
    }})
    if(!userToken) return res.sendStatus(401)
    const userUpdate = await admin_table.update({nama:req.body.nama,email:req.body.email},{
      where : {
        id : userToken[0].id
      }
    })
    if(!userUpdate) return res.sendStatus(201)
    res.sendStatus(200)
  } catch (error) {
    res.status(404).json({msg: "ada kesalahan saat update data"})
  }
}

export const Logout = async(req,res) => {

    const refreshToken = req.cookies.RefreshToken
    console.log(refreshToken)
    if(!refreshToken) return res.sendStatus(204);
    const user = await admin_table.findAll({
      where : {
        refresh_token : refreshToken
      }
    })
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id
    await admin_table.update({refresh_token : null},{
      where : {
        id : userId        
      }
    })
    res.clearCookie('RefreshToken')
    return res.sendStatus(200);

} 

export const DeleteUser = async(req,res) => {
  try {
    const deleteUser = await admin_table.destroy({where : {
      email : req.body.email
    }})
    if(!deleteUser) return res.sendStatus(204)
  } catch (error) {
   res.status(404).json({msg:"ada kesalahan, gagal menghapus akun"})    
  }
  res.clearCookie('RefreshToken')
  res.status(200).json({msg : "berhasil menghapus akun"})
  
} 

