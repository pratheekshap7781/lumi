// Picks only the fields that are safe to send to the frontend.
// passwordHash is deliberately left out — it should never leave the server.
export function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    country: user.country,
    contactNumber: user.contactNumber,
    onboardingCompleted: user.onboardingCompleted,
    createdAt: user.createdAt,
  };
}
