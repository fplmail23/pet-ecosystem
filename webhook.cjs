const http = require('http')
const crypto = require('crypto')
const { execSync } = require('child_process')

const SECRET = process.env.WEBHOOK_SECRET || 'webhook_secret_2026'
const PORT = 9000

const server = http.createServer((req, res) => {
  if (req.method !== 'POST' || req.url !== '/deploy') {
    res.writeHead(404)
    return res.end('Not found')
  }

  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', () => {
    const signature = req.headers['x-hub-signature-256']
    const hmac = 'sha256=' + crypto
      .createHmac('sha256', SECRET)
      .update(body)
      .digest('hex')

    if (signature !== hmac) {
      console.log('Firma inválida')
      res.writeHead(401)
      return res.end('Unauthorized')
    }

    const payload = JSON.parse(body)
    if (payload.ref !== 'refs/heads/main') {
      res.writeHead(200)
      return res.end('Ignored')
    }

    console.log('Deploy iniciado por push a main')
    res.writeHead(200)
    res.end('Deploy iniciado')

    try {
      const output = execSync('/var/www/pet-ecosystem/deploy.sh', {
        timeout: 120000,
        env: { ...process.env, PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' }
      })
      console.log('Deploy exitoso:', output.toString())
    } catch (err) {
      console.error('Deploy falló:', err.message)
    }
  })
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Webhook server escuchando en puerto ${PORT}`)
})
