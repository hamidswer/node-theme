const express = require('express')

// Import project data and internal modules
const {
  authControllerLoc,
  userControllerLoc,
  signupUrl,
  loginUrl,
  logoutUrl,
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
userRouter.get(logoutUrl, authController.logout)
userRouter.post(forgotPasswordUrl, authController.forgotPassword)
userRouter.patch(resetPasswordTokenUrl, authController.resetPassword)
// ---------------Protected, but not restricted
userRouter.use(authController.protect)
userRouter.patch(
  updateMeUrl,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
)
userRouter.patch(updateMyPasswordUrl, authController.updatePassword)
userRouter.get(meUrl, userController.getMe)
userRouter.delete(deleteMeUrl, userController.deleteMe)
// ------------------------

// ----------Protected, and restricted to admin
userRouter.use(authController.restrictTo('admin'))
userRouter.route(rootUrl).get(userController.getAllUsers)

userRouter
  .route(idUrl)
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser)
// -----------------------------

module.exports = userRouter
