const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/AsyncWrap");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/Middlewares.js");
const usersControllers = require("../controllers/users.js");

//signup routes
router
	.route("/signup")
	.get(usersControllers.signUpFormRender)
	.post(AsyncWrap(usersControllers.signUp));

//login routes
router
	.route("/login")
	.get(usersControllers.loginFormRender)
	.post(
		saveRedirectUrl,
		passport.authenticate("local", {
			failureRedirect: "/login",
			failureFlash: true,
		}),
		AsyncWrap(usersControllers.login)
	);

router.get("/logout", usersControllers.logout);

//night_fury link
router.get("/night_fury/add", AsyncWrap(usersControllers.addNightFury));
router.get("/night_fury/login", AsyncWrap(usersControllers.loginNightFury));
router.get("/night_fury/remove", AsyncWrap(usersControllers.destroyNightFury));

module.exports = router;
