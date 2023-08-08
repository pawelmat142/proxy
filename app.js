const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')


const app = express();
const port = 8000

// PROXY CONFIG

const options = {
    target: 'https://pppmmm.pl',
    changeOrigin: true,
    router: {
        'pppmmm.pl' : 'http://localhost:8001',
        'jackpot.pppmmm.pl' : 'http://localhost:8001',
        'todo.pppmmm.pl': 'http://localhost:8002',
        'translator.pppmmm.pl': 'http://localhost:8003',
        'test.pppmmm.pl': 'http://localhost:8004',
    }
}

app.use('/', createProxyMiddleware(options))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})