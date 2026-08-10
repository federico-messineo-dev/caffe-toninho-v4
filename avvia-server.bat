@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Caffe Toninho - Server Locale
echo ========================================
echo.
echo Apri il browser su: http://localhost:3000
echo.
echo Premi Ctrl+C per fermare il server.
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
