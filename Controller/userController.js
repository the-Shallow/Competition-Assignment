const User = require("./../models/userModel");

exports.createUser = async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
