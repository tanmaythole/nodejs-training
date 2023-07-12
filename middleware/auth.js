const { verifyJWT } = require("../utils/helper");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token is required!" });
  }

  try {
    const decodedData = verifyJWT(token);
    req.user = decodedData?.id;
  } catch (error) {
    return res.status(401).send({message: "Invalid Token"});
  }
  next();
};

module.exports = verifyToken;
