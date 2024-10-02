const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const AsyncWrap = require("../utils/AsyncWrap");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/Middlewares.js");

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
	saveRedirectUrl,
	passport.authenticate("local", {
		failureRedirect: "/login",
		failureFlash: true,
	}),
	async (req, res) => {
		let { username } = req.body;
		let redirectUrl = res.locals.redirectUrl || "/listings";
		// the above line is written because if we login from the all listings page then the locals will be empty because the is loggedIn is not triggred so the session doesnt have the redirectUrl or the req.originalUrl , so the locals will be undefined and the error will be "page not found"
		req.flash("success", `Hello ${username}, Welcome Back To ComfortNest!`);
		res.redirect(redirectUrl);
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

//demo user link
router.get("/demouser/night_fury", async (req, res) => {
	try {
		let fakeUser = new User({
			email: "shanks@gmail.com",
			username: "night_fury",
		});
		let night_fury = await User.register(fakeUser, "shanks@1468");
		req.login(night_fury, (err) => {
			if (err) {
				return next(err);
			}
			req.flash("success", "Demo user {night_fury} added!");
			res.redirect("/listings");
		});
	} catch (err) {
		req.flash("error", err.message);
		res.redirect("/signup");
	}
});

router.get("/delete_demouser/night_fury", async (req, res) => {
	try {
		await User.findOneAndDelete({ username: "night_fury" });
		req.flash("success", "Demo user { night_fury} deleted! ");
		res.redirect("/listings");
	} catch (err) {
		req.flash("error", "Something went wrong!");
		res.redirect("/listings");
	}
});

module.exports = router;
