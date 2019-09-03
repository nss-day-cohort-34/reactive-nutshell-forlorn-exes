const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/tasks/${id}`).then(result => result.json())
  },
  getAll() {
    return fetch(`${remoteURL}/tasks`).then(result => result.json())
  },
  delete(id) {
    return fetch(`${remoteURL}/tasks/${id}`, {
        method: "DELETE"
    })
    .then(result => result.json())
  },
  post(newTask) {
    return fetch(`${remoteURL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    }).then(data => data.json())
  },
}