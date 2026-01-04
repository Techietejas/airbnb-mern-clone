const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const reviewsController = require("../controllers/reviews.js");
const { validateReview, isloggedin, isReviewAuthor} = require("../middleware.js");


//Review 
//Post Review route
router.post("/", isloggedin, validateReview, wrapAsync(reviewsController.createReview));

//Delete Review route
router.delete("/:reviewId", isloggedin, isReviewAuthor, wrapAsync(reviewsController.deleteReview));

module.exports = router;