const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hotelInfoListingSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	image: {
		type: String,
		set: (v) =>
			v === ""
				? "https://images.unsplash.com/photo-1549294413-26f195200c16?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				: v,
		//this is to check the image link or any image is uploded or not , if not then a default link is uploaded;
	},
	price: Number,
	location: String,
	country: String,
});

//this below line is to register the hotelInfo as a collection in the data base
const hotelInfo = mongoose.model("hotelInfo", hotelInfoListingSchema);
module.exports = hotelInfo;
//The variable that has been exported and required in the other file should be same;
