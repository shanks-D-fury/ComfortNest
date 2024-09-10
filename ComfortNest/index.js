//Imported from npm
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

//Custom Functions
const hotelInfo = require("./models/hotelListing");
const AsyncWrap = require("./utils/AsyncWrap");
const ExpressError = require("./utils/ExpressError.js");
const { schema } = require("./utils/validationSchema.js");

app.set("views", path.join(__dirname, "views")); //used to join the path of the views
app.set("view engine", "ejs"); //To process the ejs files into html files
app.engine("ejs", ejsMate); //<%include & layouts %> can be used because of this "ejsmate"

// app.use are the middlewares used to execute in any api path
app.use(express.static(path.join(__dirname, "public"))); //used to serve the static files which are in the public folder
app.use(express.urlencoded({ extended: true })); // Parse the urlencoded to the readable format in the req.body {into object format}
app.use(express.json()); // used to parse the json format to the object format
app.use(methodOverride("_method")); //overrides any method to any other method

// Validates the server side error and throws to the error handling middleware
const ListingValidation = (req, res, next) => {
	let { error } = schema.validate(req.body);
	if (error) {
		let errMsg = error.details.map((el) => el.message).join(",");
		throw new ExpressError(400, error);
	} else {
		next();
	}
};

//Establishes the DataBase connection
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

//new post route //next is not required because we have declared that in the AsyncWrap.js file
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

// This is used to handle the unknown api requests
app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page Not Found!"));
});

//to handle the error we use this middleware
app.use((err, req, res, next) => {
	let { statusCode = 500, message = "Something Went Wrong!" } = err;
	res.status(statusCode).render("ErrorPage/Error.ejs", { message, statusCode });
});

app.listen(8080, () => {
	console.log("ComfortNest Listening {Port: 8080}");
});
