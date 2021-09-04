const Submission = require("./../models/submissionModel");

exports.createSubmission = async (req, res, next) => {
  const submission = await Submission.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      submission,
    },
  });
};

exports.getAllSubmissions = async (req, res, next) => {
    const submissions = await Submission.find({ competition: req.params.id  } );

  res.status(200).json({
    status: "success",
    data: {
      submissions,
    },
  });
};
