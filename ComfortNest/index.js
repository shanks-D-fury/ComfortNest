const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const hotelInfo = require("./models/hotelListing");
const ejsMate = require("ejs-mate");
const AsyncWrap = require("./utils/AsyncWrap");
const ExpressError = require("./utils/ExpressError.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

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
	AsyncWrap(async (req, res, next) => {
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
		// console.log(deletedListing);
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
	res.status(statusCode).send(message);
});

app.listen(8080, () => {
	console.log("ComfortNest Listening {Port: 8080}");
});

// //This is to upload a test element into the data base
// app.get("/testListing", async (req, res) => {
// 	let sampleListing = new hotelInfo({
// 		title: "New villa",
// 		description: "Latest villa in the hole world",
// 		price: 1200,
// 		country: "India",
// 		location: "Mangaluru",
// 	});
// 	await sampleListing.save();
// 	res.send("sucessful savce");
// });

// The below code is to use the header and footer in ejs mate
// <% layout('boilerplate') -%>
// <% block('head').append('<link type="text/css" href="/foo.css">') %>
// <h1>I am the template</h1>
// <% block('footer').append('<script src="/bar.js"></script>') %>
