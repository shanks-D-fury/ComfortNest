const mongoose = require("mongoose");
const initData = require("./newData.js");
const hotelInfo = require("../models/hotelListing.js");

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
	await hotelInfo.insertMany(initData.data);
	console.log("Data saved succesfull");
};

init();
