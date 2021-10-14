import { Request } from "express";


const logOutModel = (req: Request) : Promise<{status: number, message: string}> => {
  delete req.session.userId;
  req.session.loggedIn = false;
  return Promise.resolve({status: 200, message: 'logged out'});
};

export default logOutModel;