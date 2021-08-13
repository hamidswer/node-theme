const { reviewModelLoc, handlerLoc, canNotFind } = require('../projectData')
// const catchAsync = require(`./../${cathcAsyncLoc}`)
const ReviewModel = require(`./../${reviewModelLoc}`)
const handler = require(`./../${handlerLoc}`)
exports.setUserIds = (req, res, next) => {
  if (!req.body.post) {
    req.body.post = req.params.postId
  }
  if (!req.body.user) {
    req.body.user = req.user.id
  }
  next()
}
exports.createReview = handler.addNew(ReviewModel)
exports.getAllReviews = handler.getAll(ReviewModel, canNotFind, 'review')
exports.getReview = handler.getOne(ReviewModel, canNotFind, 'review')
exports.deleteReview = handler.deleteOne(ReviewModel, canNotFind + 'review')
exports.editReview = handler.editOne(ReviewModel, canNotFind, 'review')
