function saveSession(req, res) {
    const { email } = req.body
    req.session.email = email
    return res.json({status: "OK"})
}

function getSession(req, res) {
    if(req.session.email) {
        return res.json({email: req.session.email})
    }
    return res.json({status: "BAD"})
}

module.exports = {
    saveSession,
    getSession
}