// @ts-nocheck
import { Request, Response } from "express";

import {
  setTokens,
  validateAccessToken,
  validateRefreshToken,
  tokenCookies,
} from "./AuthHelper";
import { User } from "../entities/User";

export const ValidateTokensMiddleware = async (
  req: Request,
  res: Response,
  next: any
) => {
  const refreshToken = req.cookies["refresh"];
  const accessToken = req.cookies["access"];
  req.token = accessToken;

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    const user = await User.findOne({ email: decodedRefreshToken.user.email });
    if (!user || user.tokenVersion !== decodedRefreshToken.user.tokenVersion) {
      // remove cookies if token not valid
      res.clearCookie("access");
      res.clearCookie("refresh");
      req.user = null;
      req.token = null;
      return next();
    }
    const userTokens = setTokens(user);
    req.user = decodedRefreshToken.user;
    req.token = userTokens.accessToken;
    // update the cookies with new tokens
    const cookies = tokenCookies(userTokens);
    res.clearCookie("access");
    res.clearCookie("refresh");
    res.cookie(...cookies.access);
    res.cookie(...cookies.refresh);
    //res.cookie(cookies.access[0], cookies.access[1], cookies.access[2]);
    //res.cookie(cookies.refresh[0], cookies.refresh[1], cookies.refresh[2]);
    return next();
  }
  next();
};
