const express = require("express");
const router = express.Router();
const hotelInfo = require("../models/hotelListing");
const AsyncWrap = require("../utils/AsyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../utils/validationSchema.js");
const { isLoggedIn } = require("../utils/loggedInMw.js");

const ListingValidation = (req, res, next) => {
	let { error } = listingSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, error);
	} else {
		next();
	}
};

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
		const listing = await hotelInfo.findById(id).populate("reviews");
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
	ListingValidation,
	isLoggedIn,
	AsyncWrap(async (req, res) => {
		const newHotelInfo = new hotelInfo(req.body.Listing);
		await newHotelInfo.save();
		req.flash("success", "New Listing Succesfully Created");
		res.redirect("/listings");
	})
);

//edit route
router.get(
	"/:id/edit",
	isLoggedIn,
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
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		let deletedListing = await hotelInfo.findByIdAndDelete(id);
		req.flash("success", "Listing Deleted Succesfully");
		res.redirect(`/listings/`);
	})
);

module.exports = router;
