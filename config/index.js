const path = require("path")
const dotenv = require("dotenv")

if(typeof process !== "undefined") {
    const mode = ((process.argv[2] || "dev") === "dev" ? "hidden" : "production")
    dotenv.config({path: path.resolve(__dirname, `../.env.${mode}`)})
}

module.exports = {
    SERVER_SESSION_SECRET_KEY: process.env.SERVER_SESSION_SECRET_KEY,
    SERVER_PROTCOL: process.env.SERVER_PROTOCOL,
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    SERVER_PORT: process.env.SERVER_PORT,

    CLIENT_PROTOCOL: process.env.CLIENT_PROTOCOL,
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
    CLIENT_PORT: process.env.CLIENT_PORT,

    DATABASE_URL: process.env.DATABASE_URL,

    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY
}