function updatePrices(showTax) {
	const prices = document.querySelectorAll(".listing-price"); // Select all price elements

	prices.forEach((priceElement) => {
		const basePrice = parseFloat(priceElement.getAttribute("data-base-price")); // Get the original price from data attribute
		let finalPrice = basePrice;

		if (showTax) {
			// Calculate price with 18% tax
			finalPrice = basePrice + basePrice * 0.18;
			priceElement.classList.add("bold-price");
		} else {
			priceElement.classList.remove("bold-price");
		}

		// Update the price display
		priceElement.textContent = finalPrice.toLocaleString("en-in", {
			minimumFractionDigits: 2,
		});
	});
}

// Listen for toggle switch change
document
	.getElementById("flexSwitchCheckDefault")
	.addEventListener("change", function () {
		const showTax = this.checked;
		updatePrices(showTax); // Update the prices based on the toggle
	});
