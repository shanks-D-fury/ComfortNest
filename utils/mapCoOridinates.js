const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxgeocoding({ accessToken: process.env.MAP_TOKEN });

async function Map_coordinates(location, country) {
	try {
		const response = await geocodingClient
			.forwardGeocode({
				query: `${location},${country}`,
				limit: 1,
			})
			.send();
		const geometry = response.body.features[0].geometry;
		return geometry; // Return the response body (coordinates, etc.)
	} catch (error) {
		console.error("Error fetching geocode data:", error);
		throw error; // Throw error to handle it in the calling function
	}
}

module.exports = Map_coordinates;
