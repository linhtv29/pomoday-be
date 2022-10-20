const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
	  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Authentication invalid" });
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.userName };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Authentication invalid" });
  }
};

module.exports = auth;
