import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
  const authorization = req.headers["authorization"];
  const getToken = authorization && authorization.split(" ")[1];
  jwt.verify(getToken, process.env.KEY_ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(401);
    next();
  });
};
