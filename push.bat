@echo off
REM ===============================
REM One-click push to GitHub
REM ===============================

cd /d D:\projects\OH-Codex\web

git add .
git commit -m "update"
git branch -M main
git push -u origin main

echo.
echo ✅ Code has been pushed to GitHub!
echo.
pause
