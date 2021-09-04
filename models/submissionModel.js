const mongoose = require("mongoose");
const Competition = require("./competitionModel");

const submissionSchema = mongoose.Schema({
  image: {
    type: String,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  competition: {
    type: mongoose.Schema.ObjectId,
    ref: "Competitions",
  },
  likes: {
    type: Number,
    default:0
  }
});

submissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "-__v",
  });
  next();
});



submissionSchema.statics.calcSubmissions = async function (competitionId) {
  const stats = await this.aggregate([
    {
      $match: { competition: competitionId },
    },
    {
      $group: {
        _id: `$competition`,
        nRating: { $sum: 1 },
      },
    },
  ]);

  console.log(stats);
  if (stats.length > 0) {
    await Competition.findByIdAndUpdate(competitionId, {
      submissions: stats[0].nRating,
    });
  } 
};


submissionSchema.post("save", function () {
  this.constructor.calcSubmissions(this.competition);
});


// submissionSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();

//   next();
// });

// submissionSchema.post(/^findOneAnd/, async function () {
//   console.log(this.r);
//   await this.r.constructor.calcSubmissions(this.r.competition);
// });




// submissionSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "competition",
//     select: "-__v",
//   });
//   next();
// });

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
