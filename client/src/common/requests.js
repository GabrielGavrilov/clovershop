const server = require("@/common/serverInfo")

async function fetchRequestToServer(method, route) {
    const call = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"}
    })

    const data = await call.json();
    
    const response = {
        status: call.status,
        data: data
    }

    return response
}

async function fetchRequestToServerWithBody(method, route, body) {
    const call = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })

    const data = await call.json();

    const response = {
        status: call.status,
        data: data
    }

    return response
}

async function credentialFetchRequestToServer(method, route) {
    const call = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    })

    const data = await call.json();

    const response = {
        status: call.status,
        data: data
    }

    return response
}

async function credentialFetchRequestToServerWithBody(method, route, body) {
    const call = await fetch(server.url + route, {
        method: method,
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(body)
    })

    const data = await call.json()

    const response = {
        status: call.status,
        data: data
    }

    return response
}

module.exports = {
    fetchRequestToServer,
    fetchRequestToServerWithBody,
    credentialFetchRequestToServer,
    credentialFetchRequestToServerWithBody
}