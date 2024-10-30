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
            <div class="indexCard card">
              <a href="/listings/${listing._id}" id="normalTitleLink">
                <img src="${listing.image.url}" class="card-img-top" alt="${
						listing.title
					}" />
                <div class="card-body">
                  <p class="card-text">
                    <b>${listing.title}</b><br />
                    <span class="price"
							>&#8377;
							<span
								class="listing-price"
								data-base-price=${listing.price}"
							>
								${listing.price.toLocaleString("en-in", {
									minimumFractionDigits: 2,
								})}
							</span>
							/night</span
						>
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
