import jwt from "jsonwebtoken";

const COOKIE_NAME = "lumi_token";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// Creates a JWT for the given user id and sends it to the browser as an
// httpOnly cookie. httpOnly means frontend JavaScript can never read the
// token (protects against XSS token theft), while the browser still
// sends it automatically with every request to our API.
export function sendAuthCookie(res, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SEVEN_DAYS_MS,
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export { COOKIE_NAME };
