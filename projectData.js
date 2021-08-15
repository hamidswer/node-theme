// projects names
exports.itemName = 'post'

// DB names
exports.databaseOne = 'posts'
exports.databaseTwo = 'users'
exports.databaseThree = 'review'
// File Locations

exports.handlerLoc = 'controllers/handler'
exports.postControllerLoc = 'controllers/postController'
exports.errorControllerLoc = 'controllers/errorController'
exports.userControllerLoc = 'controllers/userController'
exports.authControllerLoc = 'controllers/authController'
exports.reviewControllerLoc = 'controllers/reviewController'
exports.viewControllerLoc = 'controllers/viewController'

exports.postModelLoc = 'models/postModel'
exports.userModelLoc = 'models/userModel'
exports.reviewModelLoc = 'models/reviewModel'

exports.routerStaticLoc = 'public'
exports.viewsLoc = 'views'

exports.importPostLoc = 'data/posts.json'
exports.importReviewsLoc = 'data/reviews.json'
exports.importUsersLoc = 'data/users.json'

exports.postRouterLoc = 'routes/postRoutes'
exports.userRouterLoc = 'routes/userRoutes'
exports.reviewRouterLoc = 'routes/reviewRoutes'
exports.viewRouterLoc = 'routes/viewRoutes'

exports.apiFeaturesLoc = 'utils/apiFeatures'
exports.appErrorLoc = 'utils/appError'
exports.cathcAsyncLoc = 'utils/catchAsync'
exports.sendEmailLoc = 'utils/email'

exports.configLoc = 'config.env'

// email
exports.fromEmail = 'Soomera <info@soomera.com>'
exports.titleEmail = 'Your password reset token (valid for 10 min)'
exports.messageOneEmail =
  'Forgot your password? Submit request with your new password and passwordConfirm to: '
exports.messageTwoEmail =
  '\nIf you did not forget your password, please ignore this email!'

// ---------------------------------------- URLs
// ------------URLs => API
exports.rootUrl = '/'
exports.idUrl = '/:id'
exports.postRouterUrl = '/posts'
exports.statsUrl = '/stats'
exports.topFiveUrl = '/top-5'
exports.meUrl = '/me'
exports.userRouterUrl = '/users'
exports.reviewRouterUrl = '/reviews'
exports.signupUrl = '/signup'
exports.loginUrl = '/login'
exports.forgotPasswordUrl = '/forgotPassword'
exports.resetPasswordTokenUrl = '/resetPassword/:token'
exports.updateMyPasswordUrl = '/updateMyPassword'
exports.updateMeUrl = '/updateMe'
exports.deleteMeUrl = '/deleteMe'
exports.resetPasswordUrl = '/users/resetPassword/'
exports.nearMeUrl = '/near-me/:distance/center/:latlng/unit/:unit'
exports.distancesFromMeUrl = '/distances/:latlng/unit/:unit'

// ------------URLs => Views
exports.homeUrl = '/'
exports.overviewUrl = '/overview'
exports.postUrl = '/posts/:slug'
//  Notes
//  getStats should write individually for any project based on JSON file ./controllers
//  model should write individually for any project based on JSON file ./models

exports.parameterPollutionWhitelist = [
  'duration',
  'ratingsQuantity',
  'ratingsAverage',
  'maxGroupSize',
  'cookTime',
  'price'
]
