const express = require('express')
// Import project data and internal modules
const {
  authControllerLoc,
  userControllerLoc,
  signupUrl,
  loginUrl,
  forgotPasswordUrl,
  resetPasswordTokenUrl,
  updateMyPasswordUrl,
  updateMeUrl,
  deleteMeUrl,
  rootUrl,
  idUrl,
  meUrl
} = require('../projectData')
const userController = require(`./../${userControllerLoc}`)
const authController = require(`./../${authControllerLoc}`)

const userRouter = express.Router()

// --------------Unprotected, and not restricted
userRouter.post(signupUrl, authController.signup)
userRouter.post(loginUrl, authController.login)
userRouter.post(forgotPasswordUrl, authController.forgotPassword)
userRouter.patch(resetPasswordTokenUrl, authController.resetPassword)

// ---------------Protected, but not restricted
userRouter.use(authController.protect)
userRouter.patch(updateMyPasswordUrl, authController.updatePassword)
userRouter.get(meUrl, userController.getMe)
userRouter.patch(updateMeUrl, userController.updateMe)
userRouter.delete(deleteMeUrl, userController.deleteMe)
// ------------------------

// ----------Protected, and restricted to admin
userRouter.use(authController.restrictTo('admin'))
userRouter
  .route(rootUrl)
  .get(userController.getAllUsers)
  .post(userController.createUser)

userRouter
  .route(idUrl)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
// -----------------------------

module.exports = userRouter
