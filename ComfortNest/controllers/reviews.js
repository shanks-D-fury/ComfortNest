const hotelInfo = require("../models/hotelListing.js");
const Review = require("../models/reviews.js");

module.exports.newReview = async (req, res) => {
	let { id } = req.params;
	let listing = await hotelInfo.findById(id);
	let newReview = new Review(req.body.Review);
	newReview.author = req.user._id;
	listing.reviews.push(newReview);

	await newReview.save();
	await listing.save();
	req.flash("success", "New Review Succesfully Created");
	res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
	let { id, reviewId } = req.params;
	await Review.findByIdAndDelete(reviewId);
	await hotelInfo.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
	req.flash("success", "Review Deleted Succesfully");
	res.redirect(`/listings/${id}`);
};
