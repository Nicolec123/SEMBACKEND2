@echo off
setlocal

:: Obtém o diretório do script
set "SCRIPT_DIR=%~dp0"

:: Define o caminho do Chrome (ajuste se necessário)
set "CHROME_PATH=C:\Program Files\Google\Chrome\Application\chrome.exe"

:: Verifica se o Chrome existe no caminho padrão
if not exist "%CHROME_PATH%" (
    echo Google Chrome não encontrado no caminho padrão.
    echo Verifique se está instalado e modifique o script conforme necessário.
    pause
    exit /b
)

:: Inicia o Chrome com CORS desativado
echo Iniciando Google Chrome com CORS desativado...
start "" "%CHROME_PATH%" --disable-web-security --user-data-dir="%SCRIPT_DIR%chrome_dev"

endlocal