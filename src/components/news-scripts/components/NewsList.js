import React, { Component } from 'react'
//import the components we will need
import NewsCard from './NewsCard'
import NewsManager from '../modules/NewsManager'

class NewsList extends Component {
    //define what this component needs to render
    state = {
        articles: [],
    }

    componentDidMount() {
        console.log("NEWS LIST: ComponentDidMount");
        //getAll from AnimalManager and hang on to that data; put it in state
        NewsManager.getAllArticles()
            .then((articles) => {
                this.setState({
                    articles: articles
                })
            })
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
