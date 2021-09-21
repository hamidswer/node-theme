const express = require('express')
const router = express.Router()
const {
  viewControllerLoc,
  homeUrl,
  overviewUrl,
  postUrl,
  authControllerLoc
} = require('./../projectData')

const viewController = require(`./../${viewControllerLoc}`)
const authController = require(`./../${authControllerLoc}`)
router.get(
  '/me/all-users',
  authController.isLoggedIn,
  viewController.getAllUsers
)
router.get(homeUrl, authController.isLoggedIn, viewController.getOverview)
router.get(overviewUrl, authController.isLoggedIn, viewController.getOverview)
router.get('/posts', authController.isLoggedIn, viewController.getOverview)
router.get('/me', authController.isLoggedIn, viewController.getAccount)
router.get('/users/resetPassword/:id', viewController.resetPassword)
router.get(postUrl, authController.isLoggedIn, viewController.getPost)
router.get('/me/write', authController.isLoggedIn, viewController.writePost)
router.get(
  '/posts/:id/edit',
  authController.isLoggedIn,
  viewController.editPost
)
router.get(
  '/overview/:sort',
  authController.isLoggedIn,
  viewController.getOverview
)
router.get('/*/', authController.isLoggedIn, viewController.getOverview)
module.exports = router
