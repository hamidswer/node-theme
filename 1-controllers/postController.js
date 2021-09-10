// Import project data and internal modules
const {
  postModelLoc,
  cathcAsyncLoc,
  itemName,
  handlerLoc,
  appErrorLoc,
  routerStaticLoc
} = require('../projectData')

const { canNotFind } = require('../projectDataError')

const PostModel = require(`./../${postModelLoc}`)
// const APIFeatures = require(`./../${apiFeaturesLoc}`)
const catchAsync = require(`./../${cathcAsyncLoc}`)
const AppError = require(`./../${appErrorLoc}`)
const handler = require(`./../${handlerLoc}`)
const multer = require('multer')
const sharp = require('sharp')

exports.setUserId = catchAsync(async (req, res, next) => {
  if (!req.body.user) {
    req.body.user = req.user.id
  }
  next()
})
exports.setPostId = catchAsync(async (req, res, next) => {
  if (!req.body.post) {
    const post = await PostModel.findOne({ slug: req.params.id })
    req.params.id = post.id
  }
  next()
})

const multerStorage = multer.memoryStorage()
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

exports.uploadPostImages = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 3 }
])

exports.resizePostImages = catchAsync(async (req, res, next) => {
  // image
  if (req.files.image) {
    req.body.image = `post-${req.user.id}-${Date.now()}-cover.jpeg`
    await sharp(req.files.image[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(
        `${routerStaticLoc}/img/users/${req.user.folder}/${req.body.image}`
      )
  }
  // images
  if (req.files.images) {
    req.body.images = []
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `post-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`${routerStaticLoc}/img/users/${req.user.folder}/${filename}`)
        req.body.images.push(filename)
      })
    )
  }
  next()
})

exports.getStats = catchAsync(async (req, res, next) => {
  const stats = await PostModel.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$cookTime' },
        numbersOfPosts: { $sum: 1 },
        totalNumberOfRatings: { $sum: '$ratingsQuantity' },
        averageRating: { $avg: '$ratingsAverage' },
        minimumRating: { $min: '$ratingsAverage' },
        maximumRating: { $max: '$ratingsAverage' }
      }
    },
    {
      $sort: { averageRating: 1 }
    },
    {
      $match: { _id: { $ne: 'SLOW' } }
    }
  ])
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  })
})

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params
  const [lat, lng] = latlng.split(',')
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001
  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitur and longitude in the format lat,lng.',
        400
      )
    )
  }
  const distances = await PostModel.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1]
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier
      }
    },
    {
      $project: {
        distance: 1,
        name: 1
      }
    }
  ])
  res.status(200).json({
    status: 'success',
    data: {
      data: distances
    }
  })
})

exports.getLocationWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params
  const [lat, lng] = latlng.split(',')
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1
  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitur and longitude in the format lat,lng.',
        400
      )
    )
  }
  //  filter object ===> { location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }  }
  const posts = await PostModel.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
  })
  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      data: posts
    }
  })
})

exports.addData = handler.addNew(PostModel)

exports.getAllData = handler.getAll(PostModel, canNotFind, itemName)

exports.getAData = handler.getOne(PostModel, canNotFind, itemName)

exports.deleteData = handler.deleteOne(PostModel, canNotFind + itemName)

exports.editData = handler.editOne(PostModel, canNotFind, itemName)
