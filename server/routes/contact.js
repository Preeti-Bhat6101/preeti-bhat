const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, reason, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Name, email and message are required." });
  }

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New message from ${name} — preeti-bhat.com`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${reason ? `<p><strong>What brings them here:</strong> ${reason}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again." });
  }
});

module.exports = router;
