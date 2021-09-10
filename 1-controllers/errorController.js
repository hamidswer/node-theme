// Import project data and internal modules
const { appErrorLoc } = require('../projectData')
const {
  duplicateFieldValue,
  invalidInputData,
  somethingIsWrong,
  canNotFind
} = require('../projectDataError')

const AppError = require(`../${appErrorLoc}`)

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message)
  const message = invalidInputData + errors.join('. ')
  return new AppError(message, 400)
}

const handleDuplicateFields = (err) => {
  const value = err.keyValue.name
  const message = duplicateFieldValue + value
  return new AppError(message, 400)
}

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`
  return new AppError(message, 400)
}

const sendErrorDev = (err, req, res) => {
  // API error
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}
// const sendErrorDev = (err, req, res) => {
//   if (req.originalUrl.startsWith('/api')) {
//     // API error
//     res.status(err.statusCode).json({
//       status: err.status,
//       error: err,
//       message: err.message,
//       stack: err.stack
//     })
//   } else {
//     // Renderd website
//     res.status(err.statusCode).render('error', {
//       title: 'Something went wrong!',
//       msg: err.message
//     })
//   }
// }
const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // App
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    }
    return res.status(500).json({
      status: 'error',
      message: somethingIsWrong
    })
  } else {
    // Rendered website
    if (err.isOperational) {
      return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
      })
    }
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: 'Please try again later.'
    })
  }
}

exports.errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res)
  } else {
    let error = { ...err }
    error.message = err.message
    if (err.name === 'CastError') {
      error = handleCastError(error)
    }
    if (err.code === 11000) {
      error = handleDuplicateFields(error)
    }
    if (err.name === 'ValidationError') {
      error = handleValidationError(error)
    }
    sendErrorProd(error, req, res)
  }
}

exports.notFound = (req, res, next) => {
  next(new AppError(canNotFind + req.originalUrl, 404))
}
