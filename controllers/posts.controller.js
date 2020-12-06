exports.getAll = (req, res) => {
  res.status(200).send("not yet implemented");
};
// (BezKoder, 2019a)
  
exports.savePost = (req, res) => {
  console.log('post Body: ', req.body);
  res.json({
    msg: "We recieved your data",
  });
};
// See https://www.youtube.com/watch?v=jwVCgueYcgE
  