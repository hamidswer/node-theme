// Import external modules
const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Import project data and internal modules
const {
  importPostLoc,
  configLoc,
  postModelLoc,
  importReviewsLoc,
  importUsersLoc,
  userModelLoc,
  reviewModelLoc
} = require('./../../projectData')

const PostModel = require('./../../2-models/postModel')
const UserModel = require('./../../2-models/userModel')
const ReviewModel = require('./../../2-models/reviewModel')

dotenv.config({ path: `./${configLoc}` })

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))

const posts = JSON.parse(
  fs.readFileSync(`${__dirname}/../../${importPostLoc}`, 'utf-8')
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../../${importUsersLoc}`, 'utf-8')
)
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/../../${importReviewsLoc}`, 'utf-8')
)
const importData = async () => {
  try {
    await PostModel.create(posts, { validateBeforeSave: false })
    // we should stop validation to import users which we had
    // await UserModel.create(users, { validateBeforeSave: false })
    // await ReviewModel.create(reviews)
    console.log('Data successfully loaded!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

const deleteData = async () => {
  try {
    await PostModel.deleteMany()
    await UserModel.deleteMany()
    // await ReviewModel.deleteMany()
    console.log('Data successfully deleted!')
  } catch (err) {
    console.log(err)
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}
