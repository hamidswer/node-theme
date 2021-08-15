const { postModelLoc, cathcAsyncLoc } = require('./../projectData')
const { homepageHeadTitleText } = require('./../themeData')

const cathcAsync = require(`./../${cathcAsyncLoc}`)
const postModel = require(`./../${postModelLoc}`)

exports.getHome = cathcAsync(async (req, res, next) => {
  res.status(200).render('base', {
    homepageHeadTitleText
  })
})

exports.getOverview = cathcAsync(async (req, res, next) => {
  const posts = await postModel.find()
  res.status(200).render('overview', {
    posts
  })
})

exports.getPost = cathcAsync(async (req, res, next) => {
  const post = await postModel.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  })
  res.status(200).render('post', {
    post
  })
})
