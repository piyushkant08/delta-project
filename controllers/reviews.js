const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");

module.exports.addReview = async (req, res, next) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = res.locals.currUser._id;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "New review created");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "review deleted");
  res.redirect(`/listings/${id}`);
};
