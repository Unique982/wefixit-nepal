// configure code email
import nodemailer from "nodemailer";
import { ENV } from "./env.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.EMAIL.USER, // here your email
    pass: ENV.EMAIL.PASS, // here googel app password
  },
});
export default transporter;
