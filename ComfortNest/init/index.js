const mongoose = require("mongoose");
// const initData = require("./newData.js");
const initData = require("./data.js");
const hotelInfo = require("../models/hotelListing.js");
const Review = require("../models/reviews.js");

main()
	.then(() => {
		console.log("Connection successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/ComfortNest");
}

const init = async () => {
	await hotelInfo.deleteMany({});
	await Review.deleteMany({});
	initData.data = initData.data.map((obj) => ({
		...obj,
		owner: "66fcdac2d6b780ece6f51985",
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
