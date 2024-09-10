const sampleListings = [
	{
		title: "The Ritz-Carlton",
		description:
			"An upscale, modern hotel known for its sophisticated design, impeccable service, and fine dining options, providing a lavish experience in the city.",
		image:
			"https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",

		price: 19999,
		location: "Bangaluru",
		country: "India",
	},
	{
		title: "The Oberoi",
		description:
			"A tranquil luxury hotel in the heart of Bangalore, offering elegant rooms with garden views and world-class dining amidst lush greenery.",
		image:
			"https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
		price: 20000,
		location: "Bangalore",
		country: "India",
	},
	{
		title: "The Grand Taj",
		description: "A luxury 5-star hotel offering a panoramic view of the city.",
		image:
			"https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 15000,
		location: "Mumbai",
		country: "India",
	},
	{
		title: "ITC Maurya",
		description: "A luxury hotel with world-class dining experiences.",
		image:
			"https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 13000,
		location: "New Delhi",
		country: "India",
	},
	{
		title: "The Lalit",
		description: "Luxury redefined in the heart of the city.",
		image:
			"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 11000,
		location: "Mumbai",
		country: "India",
	},
	{
		title: "Trident Hotel",
		description: "A 5-star hotel offering luxurious comfort and service.",
		image:
			"https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 9500,
		location: "Jaipur",
		country: "India",
	},
	{
		title: "Taj Lands End",
		description: "Waterfront views and top-tier luxury services.",
		image:
			"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
		price: 14000,
		location: "Mumbai",
		country: "India",
	},
	{
		title: "Alila Diwa Goa",
		description: "A boutique luxury hotel nestled in a serene locale.",
		image:
			"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 15000,
		location: "Goa",
		country: "India",
	},
	{
		title: "The Westin",
		description: "A hotel offering wellness and rejuvenation.",
		image:
			"https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
		price: 12000,
		location: "Mumbai",
		country: "India",
	},
	{
		title: "JW Marriott",
		description: "An urban sanctuary with premium amenities.",
		image:
			"https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 16000,
		location: "Bangalore",
		country: "India",
	},
	{
		title: "The Oberoi Grand",
		description: "Colonial-style luxury in the heart of the city.",
		image:
			"https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
		price: 14000,
		location: "Kolkata",
		country: "India",
	},
	{
		title: "Amanbagh",
		description: "A peaceful retreat in the Aravalli hills.",
		image:
			"https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
		price: 21000,
		location: "Alwar",
		country: "India",
	},
	{
		title: "The Park Hotel",
		description: "A modern hotel with vibrant ambiance.",
		image:
			"https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
		price: 9000,
		location: "New Delhi",
		country: "India",
	},
	{
		title: "Neemrana Fort Palace",
		description: "A historical fort converted into a boutique hotel.",
		image:
			"https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
		price: 8500,
		location: "Neemrana",
		country: "India",
	},
	{
		title: "The Tamara",
		description: "An eco-friendly luxury resort in the hills.",
		image:
			"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
		price: 16000,
		location: "Coorg",
		country: "India",
	},
	{
		title: "Zuri White Sands",
		description: "A beachfront hotel perfect for relaxation.",
		image:
			"https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
		price: 10000,
		location: "Goa",
		country: "India",
	},
];

module.exports = { data: sampleListings };
