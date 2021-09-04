const express = require("express");
// const competitionController = require("./../Controller/competitionController");
const submissionLikesController = require("./../Controller/submissionLikesController");

const router = express.Router();

router.route("/").post(submissionLikesController.createLike);

module.exports = router;
