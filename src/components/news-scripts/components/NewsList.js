import React, { Component } from 'react'
//import the components we will need
import NewsCard from './NewsCard'
import NewsManager from '../modules/NewsManager'
import UserManager from "../../../modules/UserManager"

class NewsList extends Component {
    state = {
        articles: [],
    }
    componentDidMount() {
        const articlesToDisplay = []
        const activeUser = JSON.parse(sessionStorage.getItem("credentials"))

        UserManager.getFriendsUserId(activeUser.activeUserId).then(friends => {
            const mineAndMyFriendIds = friends.map(friend => {
                return friend.userId
            })
            mineAndMyFriendIds.push(activeUser.activeUserId)
            console.log("ids", mineAndMyFriendIds);

            mineAndMyFriendIds.map(id => {
                NewsManager.getFriendsArticles(id).then(articles => {
                    console.log("raw result", articles);
                    articles.forEach(article => {
                        articlesToDisplay.push(article)
                    })
                    console.log("actual news obj", articles[0]);
                }).then(() => {
                    console.log(articlesToDisplay);
                    const newState = {
                        articles: articlesToDisplay
                    }
                    this.setState(newState)
                })
            })
        })
    }
    getNewsToDisplay() {
        const articlesToDisplay = []
        const activeUser = JSON.parse(sessionStorage.getItem("credentials"))

        UserManager.getFriendsUserId(activeUser.activeUserId).then(friends => {
            const mineAndMyFriendIds = friends.map(friend => {
                return friend.userId
            })
            mineAndMyFriendIds.push(activeUser.activeUserId)
            console.log("ids", mineAndMyFriendIds);

            mineAndMyFriendIds.map(id => {
                NewsManager.getFriendsArticles(id).then(article => {
                    articlesToDisplay.push(article)
                })
            })
        })
        this.setState({ articles: articlesToDisplay })
    }
    deleteArticle = id => {
        NewsManager.deleteArticle(id)
            .then(() => {
                NewsManager.getAllArticles()
                    .then((newArticles) => {
                        this.setState({
                            articles: newArticles
                        })
                    })
            })
    }
    render() {
        console.log("NewsList: Render");

        return (
            <>
                <section className="section-content">
                    <button type="button"
                        className="btn"
                        onClick={() => { this.props.history.push("/news/new") }}>
                        Add Article
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.articles.map(article =>
                        <NewsCard
                            key={article.id}
                            article={article}
                            deleteArticle={this.deleteArticle}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}
export default NewsList
