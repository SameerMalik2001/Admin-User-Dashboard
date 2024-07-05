import { Router } from 'express'
import { registerUser, loginUser,fetchUser,fetchAllUser,userDelete,updateAccountDetails, logoutUser,IsUserAdmin, tokenValidation } from '../controller/user.controllers.js'
import {verifyJWT} from '../middleware/auth.middleware.js'

const userRouter = Router()


// defining routes for user
userRouter.route('/register').post(registerUser)
userRouter.route('/findUserById/:id').get(fetchUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/logout').post(verifyJWT, logoutUser)
userRouter.route('/delete/:id').delete(verifyJWT, userDelete)
userRouter.route('/IsUserAdmin').post(verifyJWT, IsUserAdmin)
userRouter.route('/fetchAllUser').get(fetchAllUser)
userRouter.route('/updateAccountDetails').post(verifyJWT, updateAccountDetails)
userRouter.route('/tokenValidation').get(verifyJWT, tokenValidation)

export { userRouter }