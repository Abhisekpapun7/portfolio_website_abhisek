const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(cors());  

app.post('/contact', (req, res) => {
    console.log('Received request:', req.body);  // Debugging line

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        console.error('All fields are required');
        return res.status(400).json({ error: 'All fields are required' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Should always be the sender's email
        replyTo: email, // This allows you to reply directly to the sender
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
        }
        console.log('Email sent:', info.response);
        return res.json({ message: 'Email sent successfully' });  // Ensure JSON response
    });
});

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
