const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");
const slider = document.getElementById("slider");

leftButton.addEventListener("click", () => {
	slider.scrollLeft -= 110; // Adjust scroll amount as needed
});

rightButton.addEventListener("click", () => {
	slider.scrollLeft += 110; // Adjust scroll amount as needed
});
