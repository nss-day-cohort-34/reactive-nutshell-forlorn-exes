const remoteURL = "http://localhost:5002"

export default {
    getArticle(id) {
        return fetch(`${remoteURL}/articles/${id}`).then(result => result.json())
    },
    getAllArticles() {
        return fetch(`${remoteURL}/articles`).then(result => result.json())
    },
    deleteArticle(id) {
        return fetch(`http://localhost:5002/articles/${id}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    post(newArticle) {
        return fetch(`${remoteURL}/articles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArticle)
        }).then(data => data.json())
    },
    update(editedArticle) {
        return fetch(`${remoteURL}/articles/${editedArticle.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedArticle)
        }).then(data => data.json());
    }
}