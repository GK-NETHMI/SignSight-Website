/**
 * SignSight Website Backend
 * Handles email submissions from contact form
 * 
 * Setup:
 * 1. Copy .env.example to .env
 * 2. Add your Gmail email and app password to .env
 * 3. Run: npm install
 * 4. Run: node server.js
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname)));

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email configuration error:', error.message);
    console.log('\n⚠️  SETUP REQUIRED:');
    console.log('1. Copy .env.example to .env');
    console.log('2. Add your email credentials');
    console.log('3. For Gmail users:');
    console.log('   - Enable 2FA on your Google Account');
    console.log('   - Generate app password: https://myaccount.google.com/apppasswords');
    console.log('   - Use that password in .env');
  } else {
    console.log('✅ Email service ready');
  }
});

// API Routes

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', time: new Date().toISOString() });
});

/**
 * Contact form submission endpoint
 * POST /api/contact
 */
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required',
      });
    }

    // Email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address',
      });
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Message from Contact Form</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from SignSight Website Contact Form</small></p>
      `,
    };

    // Auto-reply to user
    const userMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'We received your message - SignSight Research',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Dear ${escapeHtml(name)},</p>
        <p>We've received your message and will get back to you within two working days.</p>
        <p><strong>Your message:</strong></p>
        <blockquote style="border-left: 3px solid #ccc; padding-left: 15px;">
          <p><strong>${escapeHtml(subject)}</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        </blockquote>
        <p>Best regards,<br>
        <strong>SignSight Research Team</strong><br>
        SLIIT, Malabe, Sri Lanka<br>
        <a href="mailto:signsight8@gmail.com">signsight8@gmail.com</a></p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    console.log(`✉️  Email received from ${name} (${email})`);

    res.json({
      success: true,
      message: 'Thank you! Your message has been received. We will reply within two working days.',
    });
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again later.',
    });
  }
});

// Utility function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('  🎯 SignSight Website Backend');
  console.log('='.repeat(60));
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`✅ Website: http://localhost:${PORT}/index.html`);
  console.log(`✅ API endpoint: http://localhost:${PORT}/api/contact`);
  console.log('\n📧 Contact form emails will be sent to: ' + process.env.EMAIL_TO);
  console.log('\n⏹️  Press Ctrl+C to stop the server\n');
});
