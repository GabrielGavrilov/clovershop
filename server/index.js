const cors = require("cors")
const express = require("express")
const mongoose = require("mongoose")
const mongoStore = require("connect-mongo")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const multer = require("multer")
const path = require("path")
const addr = require("../addresses")
const config = require("./devconfig")
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

app.set("view engine", "ejs")
app.use(cors({
    credentials: true,
    origin: [addr.CLIENT_ADDRESS]
}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: config.SECRET_KEY,
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

const serverPort = addr.SERVER_ADDRESS.split(":")

app.listen(serverPort[2], function() {
    console.log(`[CloverShop]: Server is running listening at ${addr.SERVER_ADDRESS}`);
})