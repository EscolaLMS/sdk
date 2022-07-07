import jwt from "jsonwebtoken";

export const secretOrPublicKey = "wellmsSuperSecret";

export const generateDataResponse = (
  expiresInSeconds: number = 5,
  message = "Login successful"
) => ({
  success: true,
  message: message,
  data: {
    token: jwt.sign({ foo: "bar", rnd: Math.random() }, secretOrPublicKey, {
      expiresIn: expiresInSeconds,
    }),
    expires_at: new Date(
      new Date().getTime() + expiresInSeconds * 1000
    ).toISOString(),
  },
});
