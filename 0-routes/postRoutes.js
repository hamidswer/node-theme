// Import external modules
const express = require('express')

// Import project data and internal modules
const {
  postControllerLoc,
  statsUrl,
  rootUrl,
  idUrl,
  nearMeUrl,
  authControllerLoc,
  reviewRouterLoc,
  distancesFromMeUrl
} = require('../projectData')
const reviewRoutes = require(`./../${reviewRouterLoc}`)

const authController = require(`../${authControllerLoc}`)
const postController = require(`../${postControllerLoc}`)
const postRouter = express.Router()

postRouter
  .route(statsUrl)
  .get(postController.getStats, postController.getAllData)

postRouter.use('/:postId/reviews', reviewRoutes)

postRouter.route(nearMeUrl).get(postController.getLocationWithin)
postRouter.route(distancesFromMeUrl).get(postController.getDistances)

postRouter
  .route(rootUrl)
  .get(postController.getAllData)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'user'),
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.setUserId,
    postController.addData
  )
postRouter
  .route(idUrl)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    postController.deleteData
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    postController.uploadPostImages,
    postController.resizePostImages,
    postController.setUserId,
    postController.setPostId,
    postController.editData
  )
  .get(postController.getAData)

module.exports = postRouter
