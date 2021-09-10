// Import external modules
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const app = express()
const cookieParser = require('cookie-parser')
const compression = require('compression')

// Import project data and internal modules
const {
  routerStaticLoc,
  postRouterLoc,
  reviewRouterLoc,
  errorControllerLoc,
  userRouterLoc,
  postRouterUrl,
  userRouterUrl,
  reviewRouterUrl,
  parameterPollutionWhitelist,
  viewsLoc,
  viewRouterLoc,
  homeUrl
} = require('./projectData')

const { tooMuchRequest } = require('./projectDataError')
const { errorController, notFound } = require(`./${errorControllerLoc}`)

const path = require('path')
app.use('/static', express.static(path.join(__dirname, routerStaticLoc)))
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
app.use(cookieParser())

// Limit the amount of data coming from body maximum 10kb

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

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
const reviewRouter = require(`./${reviewRouterLoc}`)
const viewRouter = require(`./${viewRouterLoc}`)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(compression())

app.use(express.json())
app.use(homeUrl, viewRouter)
app.use(userRouterUrl, userRouter)
app.use(postRouterUrl, postRouter)
app.use(reviewRouterUrl, reviewRouter)
// Error
app.all('*', notFound)
app.use(errorController)

module.exports = app
