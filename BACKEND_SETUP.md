# SignSight Website - Node.js Backend Setup Guide

## ✅ What's New

Your contact form now has a working backend! Here's what was added:

- **server.js** - Node.js backend with email support
- **package.json** - Dependencies management  
- **.env.example** - Email configuration template
- **start-backend.bat** - One-click startup script
- Updated **js/script.js** - Form now sends emails
- Updated **css/style.css** - Error/success styling

## 🚀 Quick Start

### Option 1: Automatic Setup (Recommended - Windows)

1. **Double-click** `start-backend.bat`
2. Follow the prompts to set up email
3. The website will open in your browser

### Option 2: Manual Setup

1. **Install Node.js** (if not already installed):
   - Download from https://nodejs.org
   - Choose LTS version

2. **Install dependencies**:
   ```cmd
   npm install
   ```

3. **Configure email** (.env file):
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_TO=signsight8@gmail.com
   PORT=3000
   ```

4. **Start the server**:
   ```cmd
   npm start
   ```

5. **Open browser**:
   ```
   http://localhost:3000
   ```

## 📧 Gmail Setup (Step-by-Step)

### Generate an App Password:

1. Go to https://myaccount.google.com/apppasswords
2. Sign in with your Gmail account
3. Under "Select app," choose **Mail**
4. Under "Select device," choose **Windows PC** (or your OS)
5. Click **Generate**
6. Copy the 16-character password (without spaces)
7. Paste into `.env` as `EMAIL_PASS`

### Security Notes:
- ✅ Use an app password (not your main Gmail password)
- ✅ Keep `.env` file private (never commit to Git)
- ✅ If using on a server, use environment variables instead of .env

## 📝 Environment Variables

### .env File Options:

```env
# Email Configuration
EMAIL_SERVICE=gmail              # Service provider
EMAIL_USER=your-email@gmail.com  # Your email
EMAIL_PASS=your-app-password     # App password
EMAIL_FROM=your-email@gmail.com  # Sender address
EMAIL_TO=admin@example.com       # Where to receive submissions

# Server
PORT=3000                        # Server port
```

## 🔧 Using Other Email Services

The backend supports any service supported by Nodemailer:

```env
# Gmail (recommended)
EMAIL_SERVICE=gmail

# Outlook
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com

# Yahoo
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com

# Custom SMTP
EMAIL_SERVICE=custom
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
```

## 🧪 Test the API

Use curl or Postman to test:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "user@example.com",
    "subject": "Test Message",
    "message": "This is a test"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you! Your message has been received..."
}
```

## 📂 Files Structure

```
SignSight-Website/
├── server.js                 # Backend server
├── package.json              # Dependencies
├── .env                       # Email config (create from .env.example)
├── .env.example              # Template
├── .gitignore                # Git ignore rules
├── start-backend.bat         # Windows startup
├── index.html
├── contact.html
├── js/
│   └── script.js            # Updated with API calls
├── css/
│   └── style.css            # Updated with error/success styles
└── ...
```

## 🐛 Troubleshooting

### "npm: command not found"
- Node.js is not installed. Download from https://nodejs.org

### "Cannot find module 'express'"
- Run `npm install` again

### "Email failed to send"
- Check .env file exists and has correct credentials
- For Gmail: Verify you generated an app password (not your main password)
- Check that 2FA is enabled on your Google Account

### Port 3000 already in use
- Change PORT in .env to another number (e.g., 3001)
- Or kill the process using that port

### Form shows error on submit
- Check browser console (F12) for error messages
- Check terminal for server-side errors
- Verify server is running (`npm start`)

## 🔒 Security Best Practices

1. **Never commit .env** - It contains sensitive credentials
2. **Use app passwords** - Not your main email password
3. **Keep credentials private** - Don't share .env file
4. **Validate input** - The server validates all inputs
5. **Use HTTPS in production** - The current setup is for localhost only

## 📤 Production Deployment

For deploying to a live server:

1. Use environment variables instead of .env file
2. Set `NODE_ENV=production`
3. Use HTTPS (not HTTP)
4. Consider using a service like:
   - Render.com
   - Heroku
   - AWS Lambda
   - Digital Ocean
   - Vercel/Netlify (with serverless functions)

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Look at console logs (terminal output)
3. Verify your email credentials are correct
4. Ensure Node.js is properly installed

---

**Happy emailing! 🎉**
