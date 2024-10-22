const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}

const User = require("./models/users.js");
const ExpressError = require("./utils/ExpressError.js");
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");

const sessionOptions = {
	secret: process.env.SESSION_SECRET_KEY,
	resave: false,
	saveUninitialized: true,
	cookie: {
		expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
		maxAge: 3 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	},
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // these two lines are used to store the user in the session and remove respectively
passport.deserializeUser(User.deserializeUser());

main()
	.then(() => {
		console.log("Mongo DB Connection Successful");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect("mongodb://127.0.0.1:27017/ComfortNest");
}

//home route
app.get("/", (req, res) => {
	res.send("working");
});

app.use((req, res, next) => {
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.currentUser = req.user;
	next();
});

// routes for listing and review
app.use("/listings", listingsRouter);
app.use("/listings/:id/review", reviewsRouter);
app.use("/", userRouter);

//error handlings
app.all("*", (req, res, next) => {
	next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
	let { statusCode = 500, message = "Something Went Wrong!" } = err;
	res.status(statusCode).render("ErrorPage/Error.ejs", { message, statusCode });
});

app.listen(8080, () => {
	console.log("ComfortNest Listening {Port: 8080}");
});
