const express = require("express");
const router = express.Router();
const AsyncWrap = require("../utils/AsyncWrap");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/Middlewares.js");
const usersControllers = require("../controllers/users.js");
if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

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

//shanksDfury link
const link = process.env.LOGIN_LINK;
router.get(link, AsyncWrap(usersControllers.loginShanksDfury));

module.exports = router;
