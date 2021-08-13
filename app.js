// Import external modules
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const app = express()

// Import project data and internal modules
const {
  postRouterLoc,
  routerStaticLoc,
  reviewRouterLoc,
  errorControllerLoc,
  userRouterLoc,
  postRouterUrl,
  userRouterUrl,
  reviewRouterUrl,
  parameterPollutionWhitelist,
  viewsLoc,
  rootUrl
} = require('./projectData')

const { tooMuchRequest } = require('./projectDataError')
const { errorController, notFound } = require(`./${errorControllerLoc}`)
const reviewRouter = require(`./${reviewRouterLoc}`)
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, viewsLoc))
// Security
// app.use(helmet())
//  rate limiter 100 request per 10 minutes
const limiter = rateLimit({
  max: 10000,
  //  milisecounds
  windowMs: 10 * 60 * 1000,
  message: tooMuchRequest
})
app.use('/', limiter)

// Limit the amount of data coming from body maximum 10kb
app.use(express.json({ limit: '10kb' }))

// Data sanitization against noSQL query injection
app.use(mongoSanitize())

//  Data sanitization against xss attack
app.use(xss())

// Preventing parameter pollution
app.use(
  hpp({
    whitelist: parameterPollutionWhitelist
  })
)

// Route
const postRouter = require(`./${postRouterLoc}`)
const userRouter = require(`./${userRouterLoc}`)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

const { homepageHeadTitleText } = require('./templateData')

app.get(rootUrl, (req, res) => {
  res.status(200).render('base', {
    homepageHeadTitleText
  })
})

app.use(userRouterUrl, userRouter)
app.use(postRouterUrl, postRouter)
app.use(reviewRouterUrl, reviewRouter)
// Error
app.all('*', notFound)
app.use(errorController)

module.exports = app
