import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile , bookAppointment, listAppointment, cancelAppointment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'
import appointmentModel from '../models/appointmentModel.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/pay-appointment', authUser, async (req, res) => {
    try {
      const { appointmentId } = req.body;
      await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true });
      res.json({ success: true, message: 'Payment successful' });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  });
  
  




export default userRouter