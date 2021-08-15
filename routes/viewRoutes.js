const express = require('express')
const router = express.Router()
const {
  viewControllerLoc,
  homeUrl,
  overviewUrl,
  postUrl
} = require('./../projectData')

const viewController = require(`./../${viewControllerLoc}`)

router.get(homeUrl, viewController.getHome)
router.get(overviewUrl, viewController.getOverview)
router.get(postUrl, viewController.getPost)

module.exports = router
