const server = require("@/modules/ServerInfoModule")

async function fetchRequestToServer(method, route) {
    const response = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"}
    })
    return await response.json();
}

async function fetchRequestToServerWithBody(method, route, body) {
    const response = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    return await response.json()
}

async function credentialFetchRequestToServer(method, route) {
    const response = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    })
    return await response.json();
}

async function credentialFetchRequestToServerWithBody(method, route, body) {
    const response = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    })
    return await response.json();
}

module.exports = {
    fetchRequestToServer,
    fetchRequestToServerWithBody,
    credentialFetchRequestToServer,
    credentialFetchRequestToServerWithBody
}