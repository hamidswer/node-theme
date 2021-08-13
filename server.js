// Import external modules
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// --------------
// this code should be here before any of our application code(app) to catch errors
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  console.log('Uncaught Exception so we shutting down the app')
  server.close(() => {
    process.exit(1)
  })
})
// ----------------

const app = require('./app')
const { configLoc } = require('./projectData')

dotenv.config({ path: `./${configLoc}` })
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  console.log('Unhandled Rejection so we shutting down the app')
  server.close(() => {
    process.exit(1)
  })
})
