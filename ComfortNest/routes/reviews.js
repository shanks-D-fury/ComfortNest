const express = require("express");
const router = express.Router({ mergeParams: true });
const hotelInfo = require("../models/hotelListing");
const Review = require("../models/reviews.js");
const AsyncWrap = require("../utils/AsyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../utils/validationSchema.js");

const ReviewValidation = (req, res, next) => {
	let { error } = reviewSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, error);
	} else {
		next();
	}
};

//Post review route
router.post(
	"/",
	ReviewValidation,
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		let listing = await hotelInfo.findById(id);
		let newReview = new Review(req.body.Review);

		listing.reviews.push(newReview);

		await newReview.save();
		await listing.save();
		// console.log("New reviews saved ");
		res.redirect(`/listings/${id}`);
	})
);

//delete review route
router.delete(
	"/:reviewId",
	AsyncWrap(async (req, res) => {
		let { id, reviewId } = req.params;
		await Review.findByIdAndDelete(reviewId);
		await hotelInfo.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

		res.redirect(`/listings/${id}`);
	})
);

module.exports = router;
