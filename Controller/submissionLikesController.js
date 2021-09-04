const SubmissionLikes = require("./../models/submissionLikeModel");

exports.createLike = async (req, res, next) => {
  const like = SubmissionLikes.create(req.body);

  res.status(200).json({
    status: "sucess",
    data: {
      like,
    },
  });
};
