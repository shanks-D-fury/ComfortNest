const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/AsyncWrap.js");
const {
	isLoggedIn,
	checkOwner,
	ListingValidation,
} = require("../utils/Middlewares.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../utils/cloudinary.js");
const upload = multer({ storage });

//Index route
router.get("/", AsyncWrap(listingControllers.indexListing));

// filter route
router.get("/filter", listingControllers.filterListings);

//search route
router.get("/search", listingControllers.searchListings);

//new route
router
	.route("/new")
	.get(isLoggedIn, listingControllers.newFormRender)
	.post(
		isLoggedIn,
		upload.single("Listing[image]"),
		ListingValidation,
		AsyncWrap(listingControllers.newListing)
	);

router
	.route("/:id")
	.get(AsyncWrap(listingControllers.showRender))
	.put(
		isLoggedIn,
		checkOwner,
		upload.single("Listing[image]"),
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
