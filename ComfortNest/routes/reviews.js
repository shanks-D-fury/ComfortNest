const express = require("express");
const router = express.Router({ mergeParams: true });
const hotelInfo = require("../models/hotelListing");
const Review = require("../models/reviews.js");
const AsyncWrap = require("../utils/AsyncWrap.js");
const { ReviewValidation } = require("../utils/Middlewares.js");
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
		req.flash("success", "New Review Succesfully Created");
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
		req.flash("success", "Review Deleted Succesfully");
		res.redirect(`/listings/${id}`);
	})
);

module.exports = router;
