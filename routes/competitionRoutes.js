const express = require('express');
const competitionController = require('./../Controller/competitionController');
const submissionController = require('./../Controller/submissionController');

const router = express.Router();

router.route('/').get(competitionController.getCompetitions).post(competitionController.createCompetition);

router.get('/:id/submission', submissionController.getAllSubmissions);

module.exports = router;