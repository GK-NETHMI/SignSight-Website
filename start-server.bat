@echo off
REM ================================================================
REM  SignSight Website — one-click local server
REM  Double-click this file to open the site in your browser with
REM  fully working download buttons.
REM ================================================================

cd /d "%~dp0"

echo.
echo  ============================================================
echo   SignSight Research Website
echo  ============================================================
echo   Starting local server on http://localhost:5500
echo   Keep this window open while browsing the site.
echo   Press Ctrl+C or close this window to stop the server.
echo  ============================================================
echo.

REM Open the default browser to the home page after a short delay
start "" "http://localhost:5500/index.html"

REM Try Python 3 first, then the old `python` command, then Node.
where py >nul 2>nul
if %ERRORLEVEL%==0 (
    py -3 -m http.server 5500
    goto :eof
)

where python >nul 2>nul
if %ERRORLEVEL%==0 (
    python -m http.server 5500
    goto :eof
)

where npx >nul 2>nul
if %ERRORLEVEL%==0 (
    npx --yes serve -l 5500 .
    goto :eof
)

echo.
echo  ERROR: Neither Python nor Node.js was found on this PC.
echo  Please install Python from https://python.org and try again,
echo  or open index.html directly (download links will still work
echo  via right-click -^> "Save link as...").
echo.
pause
