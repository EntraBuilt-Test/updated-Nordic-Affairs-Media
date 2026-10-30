@echo off
setlocal
rem ------------------------------------------------------------------
rem  Nordic Affairs Media - make a video fast for the website.
rem  HOW TO USE: drag one or many video files (.mov .mp4 .mkv ...) and
rem  drop them ON this file. For each one a new "NAME-web.mp4" appears
rem  next to the original. Upload that new file in the admin.
rem  Needs ffmpeg once:  winget install ffmpeg
rem ------------------------------------------------------------------
where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo ffmpeg is not installed. Open PowerShell and run:  winget install ffmpeg
  echo Then close this window, open it again and drop the videos once more.
  pause
  exit /b 1
)
if "%~1"=="" (
  echo Drag video files and drop them on this file.
  pause
  exit /b 1
)
:next
if "%~1"=="" goto done
echo.
echo Converting: %~nx1
ffmpeg -y -i "%~f1" -c:v libx264 -crf 26 -preset medium -pix_fmt yuv420p -vf "scale=-2:'min(1080,ih)'" -c:a aac -b:a 128k -movflags +faststart "%~dpn1-web.mp4"
shift
goto next
:done
echo.
echo Finished. Upload the files that end in -web.mp4
pause
