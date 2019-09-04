import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './News.css'

class NewsCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h2><span className="card-petname">{this.props.article.title}</span></h2>
                    <p>{this.props.article.summary}</p>
                    <a href={this.props.article.url}>Source</a>
                    <button type="button" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete Article</button>
                    <Link to={`/news/${this.props.article.id}/edit`}><button>edit details</button></Link>
                </div>
            </div >
        );
    }
}

export default NewsCard;