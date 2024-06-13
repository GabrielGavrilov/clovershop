const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const mongoStore = require("connect-mongo")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const multer = require("multer")
const path = require("path")
const config = require("../config/index")
const app = express()

const authRoutes = require("./routes/auth.routes")
const adminRoutes = require("./routes/admin.routes")
const cartRoutes = require("./routes/cart.routes")
const categoryRoutes = require("./routes/api.routes")
const orderRoutes = require("./routes/order.routes")

mongoose.connect(config.DATABASE_URL)
.then(function() {
    console.log("[CloverShop]: Server successfully connected to the database")
})
.catch(function(err) {
    console.log(err)
})

const sessionStore = new mongoStore({
    mongoUrl: config.DATABASE_URL,
    collectionName: "sessions"
})

app.use(cors({
    credentials: true,
    origin: [`${config.CLIENT_PROTOCOL}://${config.CLIENT_DOMAIN}:${config.CLIENT_PORT}`]
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: config.SERVER_SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/cart", cartRoutes)
app.use("/api", categoryRoutes)
app.use("/order", orderRoutes)

app.listen(config.SERVER_PORT, config.SERVER_DOMAIN, function() {
    console.log(`[CloverShop]: Server is running listening at ${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`);
})