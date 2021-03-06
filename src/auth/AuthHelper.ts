import { User } from "@entities/User";
import { sign, verify } from "jsonwebtoken";

const getUserDetails = (user: User) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    lastLoggedIn: user.lastLoggedIn,
  };
};
export const createAccessToken = (user: User) => {
  return sign(
    {
      user: getUserDetails(user),
    },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
    }
  );
};

export const createRefreshToken = (user: User) => {
  return sign(
    {
      user: { ...getUserDetails(user), tokenVersion: user.tokenVersion },
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME,
    }
  );
};

export const validateAccessToken = (token: string) => {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET!);
  } catch (e) {
    //console.log(e);
    return null;
  }
};

export const validateRefreshToken = (token: string) => {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (e) {
    //console.log(e);
    return null;
  }
};

export const setTokens = (user: User) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  return { accessToken, refreshToken };
};

export const tokenCookies = (tokens: any) => {
  const { accessToken, refreshToken } = tokens;
  const cookieOptions = {
    httpOnly: process.env.HTTP_ONLY,
    //secure: process.env.SECURE_COOKIE,
    // domain: "your-website.com",
    // SameSite: None
  };
  return {
    access: ["access", accessToken, cookieOptions],
    refresh: ["refresh", refreshToken, cookieOptions],
  };
};
