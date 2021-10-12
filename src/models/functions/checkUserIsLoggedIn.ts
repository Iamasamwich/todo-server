import { Request } from "express";

const checkUserIsLoggedIn = (req : Request) : Promise<boolean> => {

  if (!req.session) return Promise.resolve(false);
  if (!req.session.loggedIn || !req.session.userId) return Promise.resolve(false);

  return Promise.resolve(true);
};

export default checkUserIsLoggedIn;