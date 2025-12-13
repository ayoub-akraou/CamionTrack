import transporter from "../config/mailer.js";
import AppError from "../errors/appError.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"Fleet Manager" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    if (error.code === "EAUTH") {
      throw new AppError("Service email : authentification échouée", 502);
    }

    if (error.code === "ECONNECTION") {
      throw new AppError("Service email indisponible", 503);
    }

    if (error.code === "ETIMEDOUT") {
      throw new AppError("Service email ne répond pas", 504);
    }

    throw error;
  }
};
