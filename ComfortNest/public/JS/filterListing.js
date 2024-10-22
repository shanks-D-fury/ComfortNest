const categoryButtons = document.querySelectorAll(".category-btn");

categoryButtons.forEach((button) => {
	button.addEventListener("click", (event) => {
		const selectedCategory = event.currentTarget.getAttribute("data-category");
		fetch(`/listings/filter?category=${selectedCategory}`)
			.then((response) => response.json())
			.then((data) => {
				// Clear the current listings
				const listingsContainer = document.getElementById("listingsContainer");
				listingsContainer.innerHTML = "";

				// Add the filtered listings
				data.forEach((listing) => {
					const listingHtml = `
            <div class="card" style="width: 22.5rem">
              <a href="/listings/${listing._id}" id="normalTitleLink">
                <img src="${listing.image.url}" class="card-img-top" alt="${
						listing.title
					}" />
                <div class="card-body">
                  <p class="card-text">
                    <b>${listing.title}</b><br />
                    &#8377; ${listing.price.toLocaleString("en-in")} /night
                  </p>
                </div>
              </a>
            </div>`;

					listingsContainer.innerHTML += listingHtml;
				});
			})
			.catch((error) => console.error("Error fetching listings:", error));
	});
});
