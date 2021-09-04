const express = require('express');
const morgan = require('morgan');
const competitionRouter = require('./routes/competitionRoutes');
const userRoutes = require('./routes/userRoutes');
const submissionRouter = require('./routes/submissionRoutes');
const submissionLikeRouter = require('./routes/submissionLikesRoutes');

const app = express();

if (process.env.NODE_ENV == 'development') {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use('/like', submissionLikeRouter);
app.use('/submission', submissionRouter);
app.use("/competition", competitionRouter);
app.use('/user', userRoutes);


module.exports = app;
