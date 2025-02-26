const nodemailer = require("nodemailer");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, "public")));

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "mallickabhisek37@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Email route
app.post("/api/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER || "mallickabhisek37@gmail.com",
    to: "mallickabhisek37@gmail.com",
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Export app for Vercel
module.exports = app;
