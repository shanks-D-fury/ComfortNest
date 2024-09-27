const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const listings = require("./routes/listings.js");
const hotelInfo = require("./models/hotelListing");
const AsyncWrap = require("./utils/AsyncWrap.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./utils/validationSchema.js");
const Review = require("./models/reviews.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const ReviewValidation = (req, res, next) => {
	let { error } = reviewSchema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, error);
	} else {
		next();
	}
};

main()
	.then(() => {
		console.log("Mongo DB Connection Successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/ComfortNest");
}

//home route
app.get("/", (req, res) => {
	res.send("working");
});

app.use("/listings", listings);

//Reviews route
//Post review route
app.post(
	"/listings/:id/review",
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
app.delete(
	"/listings/:id/review/:reviewId",
	AsyncWrap(async (req, res) => {
		let { id, reviewId } = req.params;
		await Review.findByIdAndDelete(reviewId);
		await hotelInfo.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

		res.redirect(`/listings/${id}`);
	})
);
app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
	let { statusCode = 500, message = "Something Went Wrong!" } = err;
	res.status(statusCode).render("ErrorPage/Error.ejs", { message, statusCode });
});

app.listen(8080, () => {
	console.log("ComfortNest Listening {Port: 8080}");
});
