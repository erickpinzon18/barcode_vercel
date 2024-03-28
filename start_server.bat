@REM Iniciar la consola minimizada y que no salgan los comandos
@echo on
@echo Iniciando servidor ...
@REM Entrar a ruta del proyecto | Cambiar por la ruta del proyecto
cd C:\Beto\inventario\barcode_vercel
@REM Limpiar la consola
cls
@REM Ejecutar servidor modo silencioso desde pm2
@REM npm run start_server_hidden
npm run start 