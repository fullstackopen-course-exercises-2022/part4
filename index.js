const http = require('http')
const app = require('./app')
const { info } = require('./util/logger')
const PORT = 5001

const webServer = http.createServer(app)

webServer.listen(PORT, () => {
    info(`Server running on port ${PORT}`)
})