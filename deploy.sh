#!/bin/bash
set -e

echo "=== Deploy iniciado: $(date) ==="

cd /var/www/pet-ecosystem

echo "--- Pulling cambios de GitHub ---"
git pull origin main

echo "--- Instalando dependencias ---"
pnpm install --frozen-lockfile

echo "--- Aplicando migraciones de BD ---"
cd packages/db && pnpm db:push && cd ../..

echo "--- Reiniciando API ---"
pm2 reload pet-api --update-env

echo "--- Verificando health ---"
sleep 3
curl -sf http://localhost:3001/health && echo " API OK" || echo " API ERROR"

echo "=== Deploy completado: $(date) ==="
