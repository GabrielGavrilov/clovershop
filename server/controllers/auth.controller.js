const Admin = require("../models/admin.model")
const config = require("../devconfig")
const jwt = require("jsonwebtoken")

async function registerAdministrator(req, res) {
    const { firstName, lastName, email, password } = req.body
    const admin = new Admin({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    })

    await admin.save()
    .then(function() {
        console.log(`[CloverShop]: Administrator with the email ${email} has been created.`)
        return res.json({status: 200})
    })
    .catch(function() {
        return res.json({status: 400})
    })
}

async function authorizeAdministrator(req, res) {
    const { email, password } = req.body
    const admin = await Admin.findOne({email: email, password: password})

    if(!admin) {
        return res.json({
            status: 401,
            message: "Incorrect email or password"
        })
    }

    else {
        const token = jwt.sign({_id: admin._id}, config.SECRET_KEY)
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({status: 200})
    }
}

async function deauthorizeAdministrator(req, res) {
    res.cookie("jwt", "", {
        maxAge: 0
    })
    return res.json({status: 200})
}

async function getAdministratorInformation(req, res) {
    try {
        const cookie = req.cookies["jwt"]

        if(!cookie)
            return res.json({status: 401})

        const auth = jwt.verify(cookie, config.SECRET_KEY)

        if(!auth)
            return res.json({status: 401})

        const admin = await Admin.findOne({_id: auth._id})
        return res.json({
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email
        })
    } 
    catch(e) {
        console.log(e)
        return res.json({status: 400})
    }
}

module.exports = {
    registerAdministrator,
    authorizeAdministrator,
    deauthorizeAdministrator,
    getAdministratorInformation
}