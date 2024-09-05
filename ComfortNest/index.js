const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const hotelInfo = require("./models/hotelListing");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

main()
	.then(() => {
		console.log("Connection successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/ComfortNest");
}
app.get("/", (req, res) => {
	res.send("working");
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

//Index route
app.get("/listings", async (req, res) => {
	const featchedInfo = await hotelInfo.find();
	res.render("listings/index.ejs", { featchedInfo });
});

//new route
app.get("/listings/new", (req, res) => {
	res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
	let { id } = req.params;
	const listing = await hotelInfo.findById(id);
	res.render("listings/show.ejs", { listing });
});

//new post route
app.post("/listings/new", async (req, res) => {
	const newHotelInfo = new hotelInfo(req.body.Listing);
	await newHotelInfo.save();
	res.redirect("/listings");
});

app.listen(8080, () => {
	console.log("App listning in port : 8080");
});
