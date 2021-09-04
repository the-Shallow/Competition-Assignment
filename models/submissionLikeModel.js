const mongoose = require("mongoose");
const Submission = require("./submissionModel");

const submissionLikeSchema = mongoose.Schema({
  submission: {
    type: mongoose.Schema.ObjectId,
    ref: "Submission",
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
});

submissionLikeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "-__v",
  });
  next();
});

submissionLikeSchema.statics.calcSubmissionsLikes = async function (submissionId) {
  const stats = await this.aggregate([
    {
      $match: { submission: submissionId },
    },
    {
      $group: {
        _id: `$submission`,
        nRating: { $sum: 1 },
      },
    },
  ]);

  console.log(stats);
  if (stats.length > 0) {
    await Submission.findByIdAndUpdate(submissionId, {
      likes: stats[0].nRating,
    });
  }
};

submissionLikeSchema.post("save", function () {
  this.constructor.calcSubmissionsLikes(this.submission);
});

submissionLikeSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();

  next();
});

submissionLikeSchema.post(/^findOneAnd/, async function () {
  console.log(this.r);
  await this.r.constructor.calcSubmissionsLikes(this.r.submission);
});

// submissionSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "competition",
//     select: "-__v",
//   });
//   next();
// });

const SubmissionLikes = mongoose.model("SubmissionLikes", submissionLikeSchema);

module.exports = SubmissionLikes;
