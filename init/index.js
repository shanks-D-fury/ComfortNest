if (process.env.NODE_ENV != "production") {
	require("dotenv").config({ path: "../.env" }); // the path should mentioned or else the index.js file and the .env file should be at the same level
}
const mongoose = require("mongoose");
const initData = require("./newData.js");
// const initData = require("./data.js");
const hotelInfo = require("../models/hotelListing.js");
const Review = require("../models/reviews.js");
const Mongo_url = process.env.ATLAS_MONGO_URL;

main()
	.then(() => {
		console.log("Mongo DB Connection Successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(Mongo_url);
}

const init = async () => {
	await hotelInfo.deleteMany({});
	await Review.deleteMany({});
	initData.data = initData.data.map((obj) => ({
		...obj,
		owner: "67211c3d444d96e6014d7507", // update this when ever the db is newly created
	}));
	await hotelInfo.insertMany(initData.data);
	console.log("Data saved succesfull");
};

const categories = [
	"rooms",
	"cities",
	"mountain",
	"pools",
	"mansions",
	"farms",
];

// Function to add random category to all listings
async function addRandomCategoryToAllListings() {
	try {
		// Fetch all listings from the database
		const listings = await hotelInfo.find({});

		if (listings.length === 0) {
			console.log("No listings found");
			return;
		}

		// Iterate through each listing and assign a random category
		for (let listing of listings) {
			// Select a random category from the array
			const randomCategory =
				categories[Math.floor(Math.random() * categories.length)];

			// Update the category of the listing
			listing.category = randomCategory;

			// Save the updated listing
			await listing.save();
		}
		console.log("All listings have been updated with random categories.");
	} catch (err) {
		console.error("Error updating listings:", err);
	}
}

const startProcess = async () => {
	try {
		await init(); // Ensure init is done first
		await addRandomCategoryToAllListings(); // Then call addRandomCategoryToAllListings
	} catch (err) {
		console.error("Error in process:", err);
	}
};

startProcess();
