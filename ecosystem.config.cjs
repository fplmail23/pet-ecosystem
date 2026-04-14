module.exports = {
  apps: [
    {
      name: "pet-api",
      cwd: "/var/www/pet-ecosystem/apps/api",
      script: "/usr/bin/npx",
      args: "tsx src/server.ts",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
        HOST: "0.0.0.0",
        DATABASE_URL: "postgresql://petapp:PetApp2026_Secure_2026@localhost:5432/pet_ecosystem",
        REDIS_URL: "redis://localhost:6379",
        CLERK_SECRET_KEY: "sk_test_REEMPLAZA",
        CLERK_WEBHOOK_SECRET: "whsec_REEMPLAZA",
        JWT_SECRET: "supersecret_jwt_local_dev_2026",
        CORS_ORIGIN: "http://localhost:3000,http://localhost:8081"
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "400M",
      error_file: "/var/log/pet-api-error.log",
      out_file: "/var/log/pet-api-out.log"
    }
  ]
}
