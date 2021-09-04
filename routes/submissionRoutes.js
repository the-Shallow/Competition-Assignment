const express = require("express");
// const competitionController = require("./../Controller/competitionController");
const submissionController = require("./../Controller/submissionController");

const router = express.Router();

router
  .route("/")
  .post(submissionController.createSubmission);

module.exports = router;
