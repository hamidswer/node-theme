const {
  reviewModelLoc,
  handlerLoc,
  canNotFind,
  postModelLoc
} = require('../projectData')
// const catchAsync = require(`./../${cathcAsyncLoc}`)
const ReviewModel = require(`./../${reviewModelLoc}`)
const PostModel = require(`./../${postModelLoc}`)
const handler = require(`./../${handlerLoc}`)
exports.setUserIds = async (req, res, next) => {
  if (!req.body.post) {
    const post = await PostModel.findOne({ slug: req.params.postId })
    req.body.post = post.id
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
