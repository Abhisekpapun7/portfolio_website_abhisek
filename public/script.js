const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please fill in all fields." });
    }

    // Simulate a success response (Replace with actual email sending logic)
    console.log(`New Message from ${name} (${email}): ${message}`);
    return res.status(200).json({ success: "Message sent successfully!" });
});

// Vercel Specific: Handle all other routes
app.all("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Start server only when running locally
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; // Export for Vercel
