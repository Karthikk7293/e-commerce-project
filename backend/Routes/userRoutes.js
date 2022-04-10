import express from 'express'
import {authUser,getUserProfile,registerUser,updateUserProfile,getUsers,updateUser, getUsersReport,updateUserStatus} from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js'
import { generateAndSendOtp,validateOtp } from '../controllers/otpController.js'

const router=express.Router()

router.route('/register').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)
router.route('/getusers').get(protect,admin,getUsers)
router.route('/:id').put(protect,admin,updateUser)
router.route('/report/users').get(getUsersReport)
router.route('/otp').post(generateAndSendOtp)
router.route('/otp/varify').post(validateOtp)
router.route('/update/:id').put(updateUserStatus)

export default router