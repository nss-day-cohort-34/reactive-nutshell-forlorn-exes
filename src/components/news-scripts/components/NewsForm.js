import React, { Component } from 'react';
import NewsManager from '../modules/NewsManager';

class NewsForm extends Component {
    state = {
        title: "",
        summary: "",
        url: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set loadingStatus, create news object, invoke the NewsManager post method, and redirect to the full news list
    */
    constructNewArticle = evt => {
        evt.preventDefault();
        if (this.state.title === "" || this.state.summary === "" || this.state.url === "") {
            window.alert("Please complete the form to add new news");
        } else {
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(sessionStorage.getItem("credentials"))
            const article = {
                title: this.state.title,
                summary: this.state.summary,
                url: this.state.url,
                userId: currentUser.activeUserId,
                timestamp: Date.now()
            };
            // Create the animal and redirect user to news list
            NewsManager.post(article)
                .then(() => this.props.history.push("/news"));
        }
    };

    render() {

        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="title"
                                placeholder="article headline"
                            />
                            <label htmlFor="summary">Summary:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="summary"
                                placeholder="synopsis"
                            />
                            <label htmlFor="url">url:</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="url"
                                placeholder="source url"
                            />
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewArticle}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}

export default NewsForm