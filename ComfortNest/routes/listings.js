const express = require("express");
const router = express.Router();
const hotelInfo = require("../models/hotelListing");
const AsyncWrap = require("../utils/AsyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../utils/validationSchema.js");
const {
	isLoggedIn,
	checkOwner,
	ListingValidation,
} = require("../utils/Middlewares.js");

//Index route
router.get(
	"/",
	AsyncWrap(async (req, res) => {
		const featchedInfo = await hotelInfo.find();
		res.render("listings/index.ejs", { featchedInfo });
	})
);

//new route
router.get("/new", isLoggedIn, (req, res) => {
	res.render("listings/new.ejs");
});

//show route
router.get(
	"/:id",
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		const listing = await hotelInfo
			.findById(id)
			.populate({ path: "reviews", populate: { path: "author" } })
			.populate("owner");
		// The method populate is used because when an object is present in the db their reference is , to avoid that we use the populate method
		if (!listing) {
			req.flash("error", "Listing you requested Does Not exist!");
			return res.redirect("/listings");
		}
		res.render("listings/show.ejs", { listing });
	})
);

//new post route
router.post(
	"/new",
	isLoggedIn,
	ListingValidation,
	AsyncWrap(async (req, res) => {
		const newHotelInfo = new hotelInfo(req.body.Listing);
		newHotelInfo.owner = req.user._id; // this line is to add the owner details to the new listing
		await newHotelInfo.save();
		req.flash("success", "New Listing Succesfully Created");
		res.redirect("/listings");
	})
);

//edit route
router.get(
	"/:id/edit",
	isLoggedIn,
	checkOwner,
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		const Listing = await hotelInfo.findById(id);
		if (!Listing) {
			req.flash("error", "Listing you requested Does Not exist!");
			return res.redirect("/listings");
		}
		res.render("listings/edit.ejs", { Listing });
	})
);

router.put(
	"/:id",
	isLoggedIn,
	checkOwner,
	ListingValidation,
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		await hotelInfo.findByIdAndUpdate(id, { ...req.body.Listing });
		req.flash("success", "Listing Editied Succesfully");
		res.redirect(`/listings/${id}`);
	})
);

//Delete route
router.delete(
	"/:id",
	isLoggedIn,
	checkOwner,
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		let deletedListing = await hotelInfo.findByIdAndDelete(id);
		req.flash("success", "Listing Deleted Succesfully");
		res.redirect(`/listings/`);
	})
);

module.exports = router;
