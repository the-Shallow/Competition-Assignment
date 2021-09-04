const mongoose = require("mongoose");


const competitionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A User must have a name"],
    },
    description: {
      type: String,
      required: [true, "A User must have a description"],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
    },
    submissions: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


competitionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "-__v",
  });
  next();
});

const Competition = mongoose.model("Competitions", competitionSchema);

module.exports = Competition;
