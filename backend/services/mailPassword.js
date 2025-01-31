const nodemailer = require("nodemailer");

const sendPasswordResetEmail = async (email, token) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Password Reset",
    text: `You requested a password reset. Please use the following token to reset your password: ${token}`,
    html: `<p>You requested a password reset. Please use the following token to reset your password:</p><p><strong>${token}</strong></p>`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

module.exports = sendPasswordResetEmail;
