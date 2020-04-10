import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    //secure: true, //on HTTPS
    //domain: 'example.com', //set your domain
    path: "/refresh_token",
  });
};
