const url = "http://localhost:5002/messages"

const messageData = {
    getAllMessages: () => {
        return fetch(url)
            .then(r => r.json())
    },
    post: (message) => {
        return fetch(url, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(message)
        }).then(r => r.json())
    },
    update: (message) => {
        return fetch(`${url}/${message.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(message)
        })
    }
}

export default messageData