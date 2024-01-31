const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const config = require("./config")
const app = express()

const authRoutes = require("./routes/auth.routes")

mongoose.connect(config.DATABASE_URL)
.then(function() {
    console.log("[CloverShop]: Server successfully connected to the database")
})
.catch(function(err) {
    console.log(err)
})

app.use(cors({
    credentials: true,
    origin: ["https://localhost:8080"]
}))
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)

app.listen(3000, function() {
    console.log("[CloverShop]: Server is running on port 3000");
})