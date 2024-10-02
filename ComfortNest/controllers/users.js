const User = require("../models/users.js");

module.exports.signUpFormRender = async (req, res) => {
	res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
	try {
		let { password, username, email } = req.body;
		let newUser = new User({ email, username });
		let registedUser = await User.register(newUser, password);
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
};

module.exports.loginFormRender = async (req, res) => {
	res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
	let { username } = req.body;
	let redirectUrl = res.locals.redirectUrl || "/listings";
	req.flash("success", `Hello ${username}, Welcome Back To ComfortNest!`);
	res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
	req.logOut((err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", "Logged Out Succesfully!");
		res.redirect("/listings");
	});
};

module.exports.addNightFury = async (req, res) => {
	try {
		let fakeUser = new User({
			email: "shanks@gmail.com",
			username: "night_fury",
		});
		await User.register(fakeUser, "shanks@1468");
		req.flash("success", "{ night_fury } Added Succesfully!");
		res.redirect("/listings");
	} catch (err) {
		req.flash("error", err.message);
		res.redirect("/signup");
	}
};

module.exports.loginNightFury = async (req, res) => {
	let night_fury = await User.findOne({ username: "night_fury" });
	req.login(night_fury, (err) => {
		if (err) {
			return next(err);
		}
		req.flash("success", " { night_fury } LogedIn!");
		res.redirect("/listings");
	});
};

module.exports.destroyNightFury = async (req, res) => {
	try {
		await User.findOneAndDelete({ username: "night_fury" });
		req.flash("success", "{ night_fury } Removed! ");
		res.redirect("/listings");
	} catch (err) {
		req.flash("error", "Something went wrong!");
		res.redirect("/listings");
	}
};
