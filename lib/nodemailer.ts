import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "jmendez4tob@gmail.com",
    pass: process.env.GOOGLE_APLICATION_PASS,
  },
});

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

export default transporter;
