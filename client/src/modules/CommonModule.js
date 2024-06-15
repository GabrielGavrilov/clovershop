const fm = require("@/modules/FetchModule")

async function isUserAuthorized() {
    const response = await fm.credentialFetchRequestToServer("GET", "/auth/account");
    if(response.status == 401 || response.status == 400)
        return false
    return true
}

function formatPrice(price) {
    const priceString = String(price)
    const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
    return formattedPrice
}

module.exports = {
    isUserAuthorized,
    formatPrice
}