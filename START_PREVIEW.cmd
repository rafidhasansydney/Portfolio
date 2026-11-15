@echo off
cd /d "%~dp0"
set "PORTFOLIO_NODE=node"
if exist "%ProgramFiles%\nodejs\node.exe" set "PORTFOLIO_NODE=%ProgramFiles%\nodejs\node.exe"
echo Open http://127.0.0.1:4173 in your browser.
echo Keep this window open while reviewing. Press Ctrl+C to stop.
"%PORTFOLIO_NODE%" tools\build.mjs
if errorlevel 1 exit /b 1
"%PORTFOLIO_NODE%" tools\preview.mjs
pause
