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

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: somethingIsWrong
    })
  }
}

exports.errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.status = err.status || 'error'
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res)
  } else {
    let error = { ...err }
    if (err.name === 'CastError') {
      error = handleCastError(error)
    }
    if (err.code === 11000) {
      error = handleDuplicateFields(error)
    }
    if (err.name === 'ValidationError') {
      error = handleValidationError(error)
    }
    sendErrorProd(error, res)
  }
}

exports.notFound = (req, res, next) => {
  next(new AppError(canNotFind + req.originalUrl, 404))
}
