function rate(stars) {
	for (let i = 1; i <= 5; i++) {
		document.getElementById("star" + i).classList.remove("checked");
	}
	for (let i = 1; i <= stars; i++) {
		document.getElementById("star" + i).classList.add("checked");
	}
	document.getElementById("rate-" + stars).checked = true;
}
document.addEventListener("DOMContentLoaded", () => {
	rate(3); // Set 1 star as the default visual rating when the page loads
});
