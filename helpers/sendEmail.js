import nodemailer from "nodemailer";
import "dotenv/config";

const { META_UA_FROM, META_UA_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_UA_FROM,
    pass: META_UA_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);
// const email = {
//   from: META_UA_FROM,
//   to: "noresponse@gmail.com",
//   subject: "Nodemailer test",
//   text: "Привіт. Ми тестуємо надсилання листів!",
// };

const sendEmail = (data) => {
  const email = { ...data, from: META_UA_FROM };
  return transport.sendMail(email);
};

export default sendEmail;
