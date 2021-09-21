const multer = require('multer')
const sharp = require('sharp')
const {
  userModelLoc,
  cathcAsyncLoc,
  appErrorLoc,
  handlerLoc,
  canNotFind,
  routerStaticLoc
} = require('../projectData')

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
// ===================================
// ===> because we want to change the image (resize it, It is better to don't save it to disk, and just save it to memory!)
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, `${c-public/img/users}`)
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1]
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//   }
// })
const multerStorage = multer.memoryStorage()
// =====================================
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image! Please upload only image.', 400), false)
  }
}
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})
exports.uploadUserPhoto = upload.single('photo')
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next()
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(
      `${routerStaticLoc}/img/users/${req.user.folder}/${req.file.filename}`
    )
  next()
})
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    )
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email')
  if (req.file) filteredBody.photo = req.file.filename

  // 3) Update user document
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
