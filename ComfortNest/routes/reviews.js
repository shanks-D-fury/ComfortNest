const express = require("express");
const router = express.Router({ mergeParams: true });
const AsyncWrap = require("../utils/AsyncWrap.js");
const {
	ReviewValidation,
	checkAuthor,
	isLoggedIn,
} = require("../utils/Middlewares.js");
const reviewControllers = require("../controllers/reviews.js");

router.post(
	"/",
	isLoggedIn,
	ReviewValidation,
	AsyncWrap(reviewControllers.newReview)
);

//delete review route
router.delete(
	"/:reviewId",
	isLoggedIn,
	checkAuthor,
	AsyncWrap(reviewControllers.destroyReview)
);

module.exports = router;
