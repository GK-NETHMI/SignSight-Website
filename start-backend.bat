@echo off
REM ================================================================
REM  SignSight Website — Node.js Backend Setup & Server
REM  This script sets up dependencies and starts the server
REM ================================================================

echo.
echo  ============================================================
echo   SignSight Research Website - Backend Setup
echo  ============================================================
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
  echo.
  echo  Installing dependencies (this may take a minute)...
  echo.
  call npm install
  if %ERRORLEVEL% neq 0 (
    echo.
    echo  ERROR: npm install failed
    echo  Please ensure Node.js is installed: https://nodejs.org
    echo.
    pause
    exit /b 1
  )
)

REM Check if .env file exists
if not exist ".env" (
  echo.
  echo  ⚠️  Configuration file .env not found!
  echo.
  echo  Creating .env from template...
  copy ".env.example" ".env" >nul
  
  echo.
  echo  ⚠️  IMPORTANT - Email Setup Required:
  echo.
  echo  1. Open .env in a text editor
  echo  2. Add your email configuration:
  echo     - For Gmail: Generate an app password at
  echo       https://myaccount.google.com/apppasswords
  echo     - Set EMAIL_USER to your gmail address
  echo     - Set EMAIL_PASS to your app password
  echo     - Set EMAIL_TO to the address that receives submissions
  echo.
  echo  3. Save .env and run this script again
  echo.
  pause
  exit /b 1
)

echo.
echo  ============================================================
echo   Starting SignSight Website with Node.js Backend
echo  ============================================================
echo.
echo  Website:     http://localhost:3000
echo  API:         http://localhost:3000/api/contact
echo.
echo  Press Ctrl+C to stop the server
echo  ============================================================
echo.

REM Start the server
call npm start
