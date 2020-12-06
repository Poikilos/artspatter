exports.allAccess = (req, res) => {
  res.status(200).send("Welcome to the a new ArtSpatter website.");
};
// (BezKoder, 2019a)

exports.userBoard = (req, res) => {
  res.status(200).send("Profile");
};
// (BezKoder, 2019a)

exports.adminBoard = (req, res) => {
  res.status(200).send("Site Settings");
};
// (BezKoder, 2019a)

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderation");
};
// (BezKoder, 2019a)

