const Competition = require("./../models/competitionModel");

exports.createCompetition = async (req, res, next) => {
  const competition = await Competition.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      competition,
    },
  });
  next();
};

exports.getCompetitions = async (req, res, next) => {
  const competitions = await Competition.find();

  res.status(200).json({
    status: "success",
    data: {
      competitions,
    },
  });
  next();
};