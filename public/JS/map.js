document.addEventListener("DOMContentLoaded", function () {
	const listingElement = document.querySelector(".listing-item");
	const listingData = JSON.parse(listingElement.getAttribute("data-listing"));

	mapboxgl.accessToken = mapToken;
	const map = new mapboxgl.Map({
		container: "map", // container ID
		center: listingData.geometry.coordinates, // starting position [lng, lat]
		zoom: 10, // starting zoom
	});

	const marker = new mapboxgl.Marker({ color: "red" })
		.setLngLat(listingData.geometry.coordinates)
		.setPopup(
			new mapboxgl.Popup({ offset: 10 }).setHTML(
				`<h4>${listingData.title} , ${listingData.location}</h4><p>Exact Location Provided after booking!</p>`
			)
		)
		.addTo(map);
});
