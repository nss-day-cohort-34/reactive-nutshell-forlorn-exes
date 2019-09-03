import React, { Component } from "react"
import NewsManager from "../modules/NewsManager"

class NewsEditForm extends Component {
    //set the initial state
    state = {
        title: "",
        summary: "",
        loadingStatus: true,
        url: "",
        timestamp: 0,
        userId: 0
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingArticle = evt => {
        const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedArticle = {
            id: this.props.match.params.articleId,
            title: this.state.title,
            summary: this.state.summary,
            url: this.state.url,
            edited: true,
            editTime: Date.now(),
            timestamp: this.state.timestamp,
            userId: currentUser.activeUserId
        };
        NewsManager.update(editedArticle)
            .then(() => this.props.history.push("/news"))
    }

    componentDidMount() {
        NewsManager.getArticle(this.props.match.params.articleId)
            .then(article => {
                this.setState({
                    title: article.title,
                    summary: article.summary,
                    loadingStatus: false,
                    url: article.url,
                    timestamp: article.timestamp
                });
            });
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="title">Edit Headline</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="title"
                                value={this.state.title}
                            />
                            <label htmlFor="summary">Edit Summary</label>
                            <input
                                type="textarea"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="summary"
                                value={this.state.summary}
                            />
                            <label htmlFor="url">edit source url</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="url"
                                value={this.state.url}
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingArticle}
                                className="btn btn-primary"
                            >Save Changes</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default NewsEditForm