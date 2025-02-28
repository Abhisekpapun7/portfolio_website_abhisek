require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Fix CORS Policy: Allow only your frontend and localhost
app.use(
    cors({
        origin: ["http://127.0.0.1:5500", "https://your-vercel-app.vercel.app"],
        methods: ["POST", "GET"],
        allowedHeaders: ["Content-Type"],
    })
);

app.use(express.json());
app.use(express.static("public"));

// ✅ Contact form API endpoint
app.post("/api/contact", async (req, res) => {
    console.log("📩 Received request:", req.body); // Log incoming data

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.log("⚠️ Missing fields!");
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // ✅ Ensure this is set in .env
                pass: process.env.EMAIL_PASS, // ✅ Use an App Password for Gmail
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Receive the message in your email
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully!");
        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("❌ Error sending email:", error);
        res.status(500).json({ message: "Failed to send message." });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// ✅ Export for Vercel deployment
module.exports = app;
