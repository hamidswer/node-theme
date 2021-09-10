const {
  postModelLoc,
  cathcAsyncLoc,
  appErrorLoc,
  userModelLoc,
  homepageHeadTitleText,
  apiFeaturesLoc,
  topFourUrl
} = require('./../projectData')

const cathcAsync = require(`./../${cathcAsyncLoc}`)
const postModel = require(`./../${postModelLoc}`)
const AppError = require(`./../${appErrorLoc}`)
const UserModel = require(`./../${userModelLoc}`)
const APIFeatures = require(`./../${apiFeaturesLoc}`)
exports.getHome = cathcAsync(async (req, res, next) => {
  res.status(200).render('base', {
    homepageHeadTitleText
  })
})

exports.writePost = cathcAsync(async (req, res, next) => {
  res.status(200).render('writePost')
})
exports.editPost = cathcAsync(async (req, res, next) => {
  const post = await postModel.findOne({ slug: req.params.id })
  if (!post) {
    return next(new AppError('There is not any post with this name.'))
  }
  res.status(200).render('editPost', {
    post
  })
})
exports.getOverview = cathcAsync(async (req, res, next) => {
  // if (String(req.headers.referer).includes('slow')) {
  //   req.query.cookTime = 'slow'
  // }
  req.query.sort = '-ratingsAverage'
  req.query.limit = 4
  const fourFeatures = new APIFeatures(postModel.find(), req.query)
    .sort()
    .limitFields()
  const topFourPosts = await fourFeatures.query
  if (req.params.sort === 'slow') {
    req.query.cookTime = 'slow'
  }
  if (req.params.sort === 'medium') {
    req.query.cookTime = 'medium'
  }
  if (req.params.sort === 'fast') {
    req.query.cookTime = 'fast'
  }
  const features = new APIFeatures(postModel.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
  const posts = await features.query

  res.status(200).render('overview', {
    topFourPosts,
    posts
  })
})
exports.resetPassword = cathcAsync(async (req, res, next) => {
  res.status(200).render('resetPassword')
})
exports.getPost = cathcAsync(async (req, res, next) => {
  const post = await postModel.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  })
  if (!post) {
    return next(new AppError('There is not any post with this name.'))
  }
  res.status(200).render('post', {
    post
  })
})

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  })
}
exports.getAllUsers = cathcAsync(async (req, res) => {
  const users = await UserModel.find()
  res.status(200).render('allUsers', {
    title: 'Your account',
    users
  })
})
