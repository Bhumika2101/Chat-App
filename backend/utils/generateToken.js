import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XSS attacks cross site scripting attack
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // "none" for cross-origin in production
    secure: process.env.NODE_ENV !== "development", // must be true when sameSite is "none"
  });
};

export default generateTokenAndSetCookie;
