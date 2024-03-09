import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const confirmLink = `${process.env.DOMAIN}/auth/verify?token=${token}`;
  const mailOptions = {
    from: process.env.MAIL_ADDRESS,
    to: email,
    subject: "Confirm your email address",
    html: `<p>Click <a href='${confirmLink}'>here</a> to confirm your email address.`,
  };

  await transporter.sendMail(mailOptions);
};
