const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const AsyncWrap = require("../utils/AsyncWrap");

router.get("/signup", async (req, res) => {
	res.render("users/signup.ejs");
});

router.post(
	"/signup",
	AsyncWrap(async (req, res) => {
		try {
			let { password, username, email } = req.body;
			let newUser = new User({ email, username });
			let registedUser = await User.register(newUser, password);
			// console.log(registedUser);
			req.flash("success", `Hi ${username} , Welcome To ComfortNest!`);
			res.redirect("/listings");
		} catch (err) {
			req.flash("error", err.message);
			res.redirect("/signup");
		}
	})
);

module.exports = router;
