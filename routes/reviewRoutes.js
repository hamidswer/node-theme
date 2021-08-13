const express = require('express')
const reviewRouter = express.Router({ mergeParams: true })

const { reviewControllerLoc, authControllerLoc } = require('../projectData')
const reviewController = require(`./../${reviewControllerLoc}`)
const authController = require(`./../${authControllerLoc}`)

reviewRouter.use(authController.protect)
reviewRouter
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user', 'admin'),
    reviewController.setUserIds,
    reviewController.createReview
  )

reviewRouter
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('admin', 'manager'),
    reviewController.editReview
  )
  .delete(
    authController.restrictTo('admin', 'manager'),
    reviewController.deleteReview
  )

module.exports = reviewRouter
