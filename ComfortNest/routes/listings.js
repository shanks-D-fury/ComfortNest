const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/AsyncWrap.js");
const {
	isLoggedIn,
	checkOwner,
	ListingValidation,
} = require("../utils/Middlewares.js");
const listingControllers = require("../controllers/listings.js");
const multer = require("multer"); //multer helps in the parsing the data of file format into the redable format and helps in storing the file in local machine or in server
const upload = multer({ dest: "uploads/" });

//Index route
router.get("/", AsyncWrap(listingControllers.indexListing));

//new route
router
	.route("/new")
	.get(isLoggedIn, listingControllers.newFormRender)
	// .post(
	// 	isLoggedIn,
	// 	ListingValidation,
	// 	upload.single("Listing[image]"),
	// 	AsyncWrap(listingControllers.newListing)
	// );
	.post(upload.single("Listing[image]"), (req, res) => {
		res.send(req.file);
	});

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
