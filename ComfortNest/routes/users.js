const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const AsyncWrap = require("../utils/AsyncWrap");
const passport = require("passport");

router.get("/signup", async (req, res) => {
	res.render("users/signup.ejs");
});

router.post(
	"/signup",
	AsyncWrap(async (req, res, next) => {
		try {
			let { password, username, email } = req.body;
			let newUser = new User({ email, username });
			let registedUser = await User.register(newUser, password);
			// console.log(registedUser);
			req.login(registedUser, (err) => {
				if (err) {
					return next(err);
				}
				req.flash("success", `Hi ${username} , Welcome To ComfortNest!`);
				res.redirect("/listings");
			});
		} catch (err) {
			req.flash("error", err.message);
			res.redirect("/signup");
		}
	})
);

router.get("/login", async (req, res) => {
	res.render("users/login.ejs");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/login",
		failureFlash: true,
	}),
	async (req, res) => {
		let { username } = req.body;
		req.flash("success", `Hello ${username}, Welcome Back To ComfortNest!`);
		res.redirect("/listings");
	}
);

router.get("/logout", (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "Logged Out Succesfully!");
		res.redirect("/listings");
	});
});

module.exports = router;
