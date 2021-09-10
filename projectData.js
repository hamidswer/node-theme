// projects names
exports.itemName = 'post'
exports.homepageHeadTitleText = 'True Food Kitchen | Recipes megazine'

// DB names
exports.databaseOne = 'posts'
exports.databaseTwo = 'users'
exports.databaseThree = 'review'
// File Locations

exports.handlerLoc = '1-controllers/handler'
exports.postControllerLoc = '1-controllers/postController'
exports.errorControllerLoc = '1-controllers/errorController'
exports.userControllerLoc = '1-controllers/userController'
exports.authControllerLoc = '1-controllers/authController'
exports.reviewControllerLoc = '1-controllers/reviewController'
exports.viewControllerLoc = '1-controllers/viewController'

exports.postModelLoc = '2-models/postModel'
exports.userModelLoc = '2-models/userModel'
exports.reviewModelLoc = '2-models/reviewModel'

exports.routerStaticLoc = 'c-public'
exports.viewsLoc = 'a-views'

exports.importPostLoc = 'zOthers/data/posts.json'
exports.importReviewsLoc = 'zOthers/data/reviews.json'
exports.importUsersLoc = 'zOthers/data/users.json'

exports.postRouterLoc = '0-routes/postRoutes'
exports.userRouterLoc = '0-routes/userRoutes'
exports.reviewRouterLoc = '0-routes/reviewRoutes'
exports.viewRouterLoc = '0-routes/viewRoutes'

exports.apiFeaturesLoc = 'b-utils/apiFeatures'
exports.appErrorLoc = 'b-utils/appError'
exports.cathcAsyncLoc = 'b-utils/catchAsync'
exports.sendEmailLoc = 'b-utils/email'

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
exports.meUrl = '/me'
exports.userRouterUrl = '/users'
exports.reviewRouterUrl = '/reviews'
exports.signupUrl = '/signup'
exports.loginUrl = '/login'
exports.logoutUrl = '/logout'
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
//  getStats should write individually for any project based on JSON file ./0-controllers
//  model should write individually for any project based on JSON file ./models

exports.parameterPollutionWhitelist = [
  'duration',
  'ratingsQuantity',
  'ratingsAverage',
  'maxGroupSize',
  'cookTime',
  'price'
]
