const server = require("@/modules/ServerInfoModule")

async function sendFetchRequestToServer(method, route, body) {
    const response = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    return await response.json();
}

// async function sendFetchRequestToServerWithCredentials(method, route, body) {

// }

function formatPrice(price) {
    const priceString = String(price)
    const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
    return formattedPrice
}

function test() {
    console.log("test")
}

module.exports = {
    test,
    formatPrice,
    sendFetchRequestToServer
}