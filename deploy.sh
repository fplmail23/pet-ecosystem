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

echo "--- Esperando arranque ---"
sleep 8

echo "--- Verificando health ---"
HEALTH=$(curl -sf --max-time 5 http://localhost:3001/health || echo "FAIL")
if echo "$HEALTH" | grep -q "connected"; then
  echo " API OK: $HEALTH"
else
  echo " API ERROR - revisando logs"
  pm2 logs pet-api --lines 10 --nostream
fi

echo "=== Deploy completado: $(date) ==="
