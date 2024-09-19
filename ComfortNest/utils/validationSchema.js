const Joi = require("joi");
const reviews = require("../models/reviews");

module.exports.listingSchema = Joi.object({
	Listing: Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		location: Joi.string().required(),
		country: Joi.string().required(),
		price: Joi.number().required().min(1),
		image: Joi.string().allow("", null),
	}).required(),
});

module.exports.reviewSchema = Joi.object({
	Review: Joi.object({
		comment: Joi.string().required(),
		rating: Joi.number().min(1).max(5),
	}).required(),
});
