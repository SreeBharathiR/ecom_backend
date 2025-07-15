const Rating = require("../model/Rating");
const Product = require("../model/Product");

exports.addRating = async (req, res, next) => {
  try {
    const { productId, rating, review } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let existingRating = await Rating.findOne({ productId, userId });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      await existingRating.save();
      return res
        .status(200)
        .json({ message: "Rating updated", rating: existingRating });
    }

    const newRating = new Rating({ productId, userId, rating, review });
    await newRating.save();

    res.status(201).json({ message: "Rating added", rating: newRating });
  } catch (err) {
    next(err);
  }
};

exports.getProductRatings = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const ratings = await Rating.find({ productId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(ratings);
  } catch (err) {
    next(err);
  }
};

exports.getAverageRating = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const avgResult = await Rating.aggregate([
      { $match: { productId: require("mongoose").Types.ObjectId(productId) } },
      { $group: { _id: "$productId", averageRating: { $avg: "$rating" } } },
    ]);

    if (!avgResult.length) {
      return res.status(200).json({ averageRating: 0 });
    }

    res
      .status(200)
      .json({ averageRating: avgResult[0].averageRating.toFixed(2) });
  } catch (err) {
    next(err);
  }
};
