import jwt from "jsonwebtoken";
export const generatetoken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true only in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // "lax" for dev
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
