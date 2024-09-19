const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const hotelInfo = require("./models/hotelListing");
const AsyncWrap = require("./utils/AsyncWrap");
const ExpressError = require("./utils/ExpressError.js");
const { schema } = require("./utils/validationSchema.js");
const Review = require("./models/reviews.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

const ListingValidation = (req, res, next) => {
	let { error } = schema.validate(req.body);
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
app.get("/", (req, res) => {
	res.send("working");
});

//Index route
app.get(
	"/listings",
	AsyncWrap(async (req, res) => {
		const featchedInfo = await hotelInfo.find();
		res.render("listings/index.ejs", { featchedInfo });
	})
);

//new route
app.get("/listings/new", (req, res) => {
	res.render("listings/new.ejs");
});

//show route
app.get(
	"/listings/:id",
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		const listing = await hotelInfo.findById(id);
		res.render("listings/show.ejs", { listing });
	})
);

//new post route
app.post(
	"/listings/new",
	ListingValidation,
	AsyncWrap(async (req, res) => {
		const newHotelInfo = new hotelInfo(req.body.Listing);
		await newHotelInfo.save();
		res.redirect("/listings");
	})
);

//edit route
app.get(
	"/listings/:id/edit",
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		const Listing = await hotelInfo.findById(id);
		res.render("listings/edit.ejs", { Listing });
	})
);

app.put(
	"/listings/:id",
	ListingValidation,
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		await hotelInfo.findByIdAndUpdate(id, { ...req.body.Listing });
		res.redirect(`/listings/${id}`);
	})
);

//Delete route
app.delete(
	"/listings/:id",
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		let deletedListing = await hotelInfo.findByIdAndDelete(id);
		res.redirect(`/listings/`);
	})
);

//Reviews route
//Post route
app.post(
	"/listings/:id/review",
	AsyncWrap(async (req, res) => {
		let { id } = req.params;
		let listing = await hotelInfo.findById(id);
		let newReview = new Review(req.body.Review);

		listing.reviews.push(newReview);

		await newReview.save();
		await listing.save();
		console.log("New reviews saved ");
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
