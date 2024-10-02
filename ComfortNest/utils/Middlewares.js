const hotelInfo = require("../models/hotelListing");

module.exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.session.redirectUrl = req.originalUrl;
		req.flash("error", "You must be Logged! ");
		return res.redirect("/login");
	}
	next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
	if (req.session.redirectUrl) {
		res.locals.redirectUrl = req.session.redirectUrl;
	}
	next();
};

module.exports.checkIsOwner = async (req, res, next) => {
	let { id } = req.params;
	let listing = await hotelInfo.findById(id);
	if (!res.locals.currentUser._id.equals(listing.owner._id)) {
		req.flash("error", "Owner and the user doesn't Match");
		return res.redirect(`/listings/${id}`);
	}
	next();
};

module.exports.ListingValidation = (req, res, next) => {
	let { error } = listingSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, error);
	} else {
		next();
	}
};
