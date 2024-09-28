const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");
const cookieParser = require("cookie-parser");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());

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

// routes for listing and review
app.use("/listings", listings);
app.use("/listings/:id/review", reviews);

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

/*Document for the cookie and the state
the cookie can be sent using the res.cookie(name,value)
when we visit a perticular path then the cookie is sent 
and those cookie can be accessed any where in the browser
for example we will be loged in if we go any where in the browser 
for the same website the cookie are accesed 

The cookie parser helps in accessing the cookie within the server
multiple cookie can be passed in a single path

signed cookie are used because any one can tamper the cookie from the browser
signed cookie are the cookie with some unique id that are sent from the server
res.cookie("name","value",{signed:true});

to access those cookie we have to use the 
req.signedCookies
note :- the req.cookie and the signedCookie will be stored differents

States for the browser :- statefull and stateless 
stateful stores the session information 

session store some info about the user activity on the website like adding some thing to the cart before the login step

session are used within the middleware
when we visit any path then this connect.sid => session id will be passed a cookie
different tabs within the same browser have same sid
but differnt browser doesn't
session is also known as the req and res cycle between the client and the user
memoryStore is well sutied for the development stage but for the production stage we should use the session store seprately

we can add variables in the req.session.variable

if we add/delete any thing then we can flash msg using the flash()

res.locals helps to save any variables that can be used in the ejs page 
res.locals.variable=value; */
