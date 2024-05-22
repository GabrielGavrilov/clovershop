const path = require("path")
const dotenv = require("dotenv")

if(typeof process !== "undefined") {
    const mode = ((process.argv[2] || process.env.NODE_ENV) === "development" ? "hidden" : "production")
    dotenv.config({path: path.resolve(__dirname, `../.env.${mode}`)})
}

console.log(process.env)

module.exports = {
    SERVER_PROTOCOL: process.env.VUE_APP_SERVER_PROTOCOL,
    SERVER_DOMAIN: process.env.VUE_APP_SERVER_DOMAIN,
    SERVER_PORT: process.env.VUE_APP_SERVER_PORT,

    CLIENT_PROTOCOL: process.env.VUE_APP_CLIENT_PROTOCOL,
    CLIENT_DOMAIN: process.env.VUE_APP_CLIENT_DOMAIN,
    CLIENT_PORT: process.env.VUE_APP_CLIENT_PORT,

    SERVER_SESSION_SECRET_KEY: process.env.SERVER_SESSION_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
}