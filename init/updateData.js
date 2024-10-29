if (process.env.NODE_ENV != "production") {
	require("dotenv").config({ path: "../.env" });
}
const initData1 = require("./newData.js"); // this file needs both image and coordinate
const initData2 = require("./data.js"); // this file only needs coordinate
const fs = require("fs");
const Map_coordinates = require("../utils/mapCoOridinates.js");

const updateDataWithImagesAndCoordinates = async () => {
	const updatedData = [];
	for (const listing of initData1.data) {
		const { location, country, image } = listing;
		try {
			const updatedImage = {
				url: image,
				filename: "listingImage",
			};
			listing.image = updatedImage;
			const geometry = await Map_coordinates(location, country);
			if (geometry) {
				listing.geometry = geometry;
			} else {
				console.warn(`Could not find coordinates for ${location}, ${country}`);
			}
			updatedData.push(listing);
		} catch (error) {
			console.error(`Error updating data for ${listing.title}:`, error);
		}
	}
	fs.writeFileSync(
		"./newData.js",
		`module.exports = ${JSON.stringify({ data: updatedData }, null, 2)};`
	);
	console.log("Images and coordinates added to initData.js");
};

updateDataWithImagesAndCoordinates(); // call this function based on your requirement

const updateDataWithCoordinates = async () => {
	const updatedData = [];
	for (const listing of initData2.data) {
		const { location, country } = listing;
		try {
			const geometry = await Map_coordinates(location, country);
			if (geometry) {
				listing.geometry = geometry;
			} else {
				console.warn(`Could not find coordinates for ${location}, ${country}`);
			}
			updatedData.push(listing);
		} catch (error) {
			console.error(
				`Error getting coordinates for ${location}, ${country}:`,
				error
			);
		}
	}
	fs.writeFileSync(
		"./data.js",
		`module.exports= ${JSON.stringify({ data: updatedData }, null, 2)};`
	);
};

updateDataWithCoordinates();
