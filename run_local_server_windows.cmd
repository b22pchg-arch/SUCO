@echo off
setlocal
cd /d "%~dp0"
echo Dang chay COMTRADE Reader PWA tai http://localhost:8765/
echo Hay giu cua so nay dang mo de PWA hoat dong qua localhost.
start "" http://localhost:8765/
py -3 -m http.server 8765
if errorlevel 1 (
  echo.
  echo Khong tim thay lenh py. Thu dung python...
  python -m http.server 8765
)
pause
