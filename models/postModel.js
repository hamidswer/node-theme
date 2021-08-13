// Import external modules
const mongoose = require('mongoose')
const slugify = require('slugify')

// Import project data and internal modules
const { databaseOne, itemName, databaseThree } = require('../projectData')

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, `${itemName} should have a name`],
      unique: true,
      trim: true,
      maxlength: [
        70,
        `${itemName} name must have less or equal then 70 characters`
      ],
      minlength: [
        10,
        `${itemName} name must have more or equal then 10 characters`
      ]
    },
    ingredients: {
      // type: array of objects
      type: [Object],
      required: true,
      trim: true
    },
    steps: {
      // type: array of strings
      type: [String],
      trim: true,
      required: true
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, `${itemName} rate must be above 1.0`],
      max: [5, `${itemName} rate must be below 5.0`]
    },
    ratingsQuantity: {
      type: Number,
      default: 1
    },
    imageURL: {
      type: String,
      required: [true, `${itemName} must have a cover image`],
      validate: function (val) {
        return val.startsWith('http')
      }
    },
    cookTime: {
      type: String,
      required: [true, `${itemName} must have a cook time`],
      enum: {
        values: ['slow', 'medium', 'fast'],
        message: 'Cook time is either: slow, medium, or fast'
      }
    },
    price: {
      type: Number,
      required: [false, `${itemName} must have a price`]
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    secretPost: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

postSchema.index({ ratingsAverage: 1, createdAt: -1 })
postSchema.index({ slug: 1 })
postSchema.index({ location: '2dsphere' })
postSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

// postSchema.virtual('ratingsAverageBased100').get(function () {
//   return this.ratingsAverage * 20
// })

postSchema.virtual('reviews', {
  // ref is the name of model we want to referrence
  ref: databaseThree,
  // foreignField is the name of the field in ref model which point to this model. we populated that as post
  foreignField: 'post',
  localField: '_id'
})
postSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})
postSchema.pre(/^find/, function (next) {
  this.find({ secretPost: { $ne: true } })
  next()
})
const PostModel = mongoose.model(databaseOne, postSchema)

module.exports = PostModel
