const nodemailer = require("nodemailer");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password
  },
});

// Root Route to handle GET /
app.get("/", (req, res) => {
  res.send("Backend is running! 🚀");
});

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "your-email@gmail.com", // Change to your email
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

app.listen(5000, () => console.log("Server running on port 5000"));
