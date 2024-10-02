const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/AsyncWrap.js");
const {
	isLoggedIn,
	checkOwner,
	ListingValidation,
} = require("../utils/Middlewares.js");
const listingControllers = require("../controllers/listings.js");

//Index route
router.get("/", AsyncWrap(listingControllers.indexListing));

//new route
router
	.route("/new")
	.get(isLoggedIn, listingControllers.newFormRender)
	.post(
		isLoggedIn,
		ListingValidation,
		AsyncWrap(listingControllers.newListing)
	);

router
	.route("/:id")
	.get(AsyncWrap(listingControllers.showRender))
	.put(
		isLoggedIn,
		checkOwner,
		ListingValidation,
		AsyncWrap(listingControllers.updateListing)
	)
	.delete(isLoggedIn, checkOwner, AsyncWrap(listingControllers.destroyListing));

router.get(
	"/:id/edit",
	isLoggedIn,
	checkOwner,
	AsyncWrap(listingControllers.editFormRender)
);

module.exports = router;
