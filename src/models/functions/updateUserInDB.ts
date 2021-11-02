import { Request } from "express";
import Conn from "../db";
import makeHash from "./makeHash";
import sanitiseString from "./sanitiseString";

const updateUserInDB = async (conn : Conn, req : Request) => {

  const hashEmail = await makeHash(req.body.email);

  const m = `
    UPDATE user
    set ?
    WHERE id = ?;
  `;
  const p = [
    {
      id: hashEmail,
      name: sanitiseString(req.body.name),
      email: req.body.email
    },
    req.session.userId
  ];

  return conn.send(m, p);
};

export default updateUserInDB;