const { appErrorLoc, cathcAsyncLoc, apiFeaturesLoc } = require('../projectData')
const catchAsync = require(`./../${cathcAsyncLoc}`)
const AppError = require(`./../${appErrorLoc}`)
const APIFeatures = require(`./../${apiFeaturesLoc}`)

exports.deleteOne = (Model, error, item) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id)
    if (!data) {
      return next(new AppError(error + item, 404))
    }
    res.status(204).json({
      status: 'success',
      data: null
    })
  })

exports.editOne = (Model, error, item) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!data) {
      return next(new AppError(error + item, 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    })
  })

exports.getOne = (Model, error, item) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findById(req.params.id).populate('reviews')
    if (!data) {
      return next(new AppError(error + item, 404))
    }
    res.status(200).json({
      status: 'success',
      data: {
        data
      }
    })
  })

exports.getAll = (Model, error, item) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
    // explain more data about search like how many data searched to find the result (indexing)
    // const allData = await features.query.explain()
    const allData = await features.query

    if (!allData) {
      return next(new AppError(error + item, 404))
    }
    res.status(200).json({
      status: 'success',
      result: allData.length,
      data: { allData }
    })
  })

exports.addNew = (Model) =>
  catchAsync(async (req, res, next) => {
    const newData = await Model.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        newData
      }
    })
  })
