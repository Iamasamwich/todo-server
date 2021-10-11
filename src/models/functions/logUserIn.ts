import { Request } from "express";

const logUserIn = (req : Request, userId : string) : void => {
  req.session.userId = userId;
  req.session.loggedIn = true;
  return;
};

export default logUserIn;