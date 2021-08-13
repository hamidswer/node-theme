// Import external modules
const express = require('express')

// Import project data and internal modules
const {
  postControllerLoc,
  statsUrl,
  topFiveUrl,
  rootUrl,
  idUrl,
  nearMeUrl,
  authControllerLoc,
  reviewRouterLoc,
  distancesFromMeUrl
} = require('../projectData')
const reviewRoutes = require(`./../${reviewRouterLoc}`)
const {
  getStats,
  topFiveRatings,
  addData,
  getAllData,
  deleteData,
  editData,
  getAData,
  getLocationWithin,
  getDistances
} = require(`../${postControllerLoc}`)
const authController = require(`../${authControllerLoc}`)

const postRouter = express.Router()
postRouter.route(statsUrl).get(getStats, getAllData)

postRouter.use('/:postId/reviews', reviewRoutes)

postRouter.route(topFiveUrl).get(topFiveRatings, getAllData)

postRouter.route(nearMeUrl).get(getLocationWithin)
postRouter.route(distancesFromMeUrl).get(getDistances)

postRouter
  .route(rootUrl)
  .get(getAllData)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    addData
  )
postRouter
  .route(idUrl)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    deleteData
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    editData
  )
  .get(getAData)

module.exports = postRouter
