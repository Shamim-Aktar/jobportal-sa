import express from 'express'
import { register, login, updateProfile, logout } from '../controllers/user.controller.js'
//import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.put('/update/:id', updateProfile)
router.get('/logout', logout)


export default router