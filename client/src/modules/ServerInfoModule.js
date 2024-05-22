const config = require("../../../config/index")

module.exports = {
    protocol: config.SERVER_PROTOCOL,
    domain: config.SERVER_DOMAIN,
    port: config.SERVER_PORT,
    url: `${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
}