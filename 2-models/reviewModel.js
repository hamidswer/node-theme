const {
  databaseOne,
  databaseTwo,
  databaseThree,
  postModelLoc
} = require('../projectData')

const mongoose = require('mongoose')
const PostModel = require(`./../${postModelLoc}`)

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      require: [true, 'Review can not be empty']
    },
    rating: {
      type: Number,
      required: [true, 'review should have rating'],
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      defaulr: Date.now
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: databaseOne,
      require: [true, 'Review must belong to a ' + databaseOne]
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: databaseTwo,
      required: [true, 'Review must belong to a ' + databaseTwo]
    }
  },
  {
    toJSON: { virtuals: true },
    roObject: { virtuals: true }
  }
)
//  let any user can just write one review per post
// reviewSchema.index({ post: 1, user: 1 }, { unique: true })

// // //  just show names of user and post when search in review
// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'post',
//     select: 'name'
//   }).populate({
//     path: 'user',
//     select: 'name'
//   })
//   next()
// })
// //  just show names of user name when search in review
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo folder role'
  })
  next()
})

// static method
reviewSchema.statics.calcAverageRatings = async function (postId) {
  // this => points to reviewModel
  const stats = await this.aggregate([
    {
      $match: { post: postId }
    },
    {
      $group: {
        _id: '$post',
        totalNumberOfRatings: { $sum: 1 },
        averageRating: { $avg: '$rating' }
      }
    }
  ])
  if (stats.length > 0) {
    await PostModel.findByIdAndUpdate(postId, {
      ratingsQuantity: stats[0].totalNumberOfRatings,
      ratingsAverage: stats[0].averageRating
    })
  } else {
    await PostModel.findByIdAndUpdate(postId, {
      ratingsQuantity: 1,
      ratingsAverage: 4.5
    })
  }
}

reviewSchema.pre('save', function (next) {
  // this.constructor === ReviewModel
  this.constructor.calcAverageRatings(this.post)
  next()
})

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne()
  next()
})
reviewSchema.post(/^findOneAnd/, async function () {
  this.r = await this.r.constructor.calcAverageRatings(this.r.post)
})

const ReviewModel = mongoose.model(databaseThree, reviewSchema)

module.exports = ReviewModel
