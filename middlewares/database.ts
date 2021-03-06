import dbConnect from "../lib/connectDB";
import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const database = async (
  _0: NextApiRequest,
  _1: NextApiResponse,
  next: NextHandler
) => {
  try {
    await dbConnect();
  } catch (error: any) {
    console.log("Database connection error ", error.message);
  }
  next();
};

export default database;
