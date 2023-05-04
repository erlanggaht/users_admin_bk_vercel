import express from "express";
import { DeleteUser, GetUsers, Logout, Register, login, update } from "../controllers/users.js";
import { verifyToken } from "../middleware/verify_token.js";
import RefreshToken from "../controllers/refresh_token.js";



const router = express.Router()

router.get('/',(req,res) => {
    res.json('url server database kami path /users dan membutuhkan token dengan /login untuk mendapatlan akses token ')
})
router.get('/users',verifyToken,GetUsers)
router.post('/register',Register)
router.post('/login',login)
router.put('/update',update)
router.get('/token',RefreshToken)
router.delete('/logout',Logout)
router.delete('/delete',DeleteUser)


export default router;
