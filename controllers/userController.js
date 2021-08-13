const {
  userModelLoc,
  cathcAsyncLoc,
  appErrorLoc,
  handlerLoc,
  canNotFind
} = require('../projectData')

const { wrongRouteForPasswordUpdate } = require('../projectDataError')
const handler = require(`./../${handlerLoc}`)

const UserModel = require(`./../${userModelLoc}`)
const catchAsync = require(`./../${cathcAsyncLoc}`)
const AppError = require(`./../${appErrorLoc}`)

const filterObj = (obj, ...allowedFields) => {
  const newObj = {}
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el]
  })
  return newObj
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await UserModel.find()
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  })
})

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await UserModel.findById(req.user.id)
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError(wrongRouteForPasswordUpdate, 400))
  }
  const filteredBody = filterObj(req.body, 'name', 'email')
  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true
    }
  )
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })
})

exports.deleteMe = catchAsync(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user.id, { active: false })
  res.status(204).json({
    status: 'success',
    data: null
  })
})

exports.createUser = handler.addNew(UserModel)
exports.getAllUsers = handler.getAll(UserModel, canNotFind, 'users')
exports.getUser = handler.getOne(UserModel, canNotFind, 'user')
exports.deleteUser = handler.deleteOne(UserModel, canNotFind + 'user')
exports.updateUser = handler.editOne(UserModel, canNotFind, 'user')
