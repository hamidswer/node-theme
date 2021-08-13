// Import project data and internal modules
const {
  postModelLoc,
  cathcAsyncLoc,
  itemName,
  handlerLoc,
  appErrorLoc
} = require('../projectData')

const { canNotFind } = require('../projectDataError')

const PostModel = require(`./../${postModelLoc}`)
// const APIFeatures = require(`./../${apiFeaturesLoc}`)
const catchAsync = require(`./../${cathcAsyncLoc}`)
const AppError = require(`./../${appErrorLoc}`)
const handler = require(`./../${handlerLoc}`)

exports.topFiveRatings = catchAsync(async (req, res, next) => {
  req.query.limit = 5
  req.query.sort = '-ratingsAverage'
  req.query.fields = 'name,ratingsAverage'
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
