const mongoose = require("mongoose");
const initData = require("./newData.js");
// const initData = require("./data.js");
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

init();
