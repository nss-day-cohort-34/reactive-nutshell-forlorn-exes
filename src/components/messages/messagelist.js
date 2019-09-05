
// The purpose of the Messages component is to build the structure of the chat room. It also contains functionality for sending/editing messages.

import React, { Component } from "react"
import MessageManager from "../../modules/MessageManager"
import UserManager from "../../modules/UserManager"

import "./messagestyle.css"

class Messages extends Component {


    state = {
        message: "",
        messages: [],
        users: [],

    }

    handleChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }
    componentDidMount() {


        this.loadAllData()
    }

    loadAllData = () => {


        const newState = {

        }

        MessageManager.getAllMessages()
            .then(messages => newState.messages = messages)
            .then(() => UserManager.getAll())
            .then(users => newState.users = users)
            .then(() => this.setState(newState))

    }



    handleSubmit = (event) => {

        event.preventDefault();
        var userInfo = JSON.parse(sessionStorage.getItem('credentials'));
        var userid = userInfo.activeUserId

        const message = {
            message: this.state.message,
            userId: userid
        }
        this.constructNewMessage(message)
            .then(() => this.setState({
                message: "",
                messages: this.state.messages
            }))

    }
    constructNewMessage = (newMessage) => {
        return MessageManager.post(newMessage)
            .then(() => this.loadAllData(sessionStorage.getItem("credentials")))
    }



    handleAddFriend = (event) => {
        event.preventDefault();

        let userNameToFind = event.target.textContent


        UserManager.getAll()
            .then(userList => userList.find(user => user.email.toLowerCase() === userNameToFind.toLowerCase()))
            .then(match => this.props.addFriend(match))

    }


    render() {

        return (

            <React.Fragment>

                <div className="card messages">
                    <div className="card-header">
                        Messages
                    </div>
                    <ul className="card-body message-list">
                        {this.state.messages.map(message => {
                            var userInfo = JSON.parse(sessionStorage.getItem('credentials'));
                            var userid = userInfo.activeUserId


                            if (message.userId === userid) {
                                return <li className="card-text myMessages" key={message.id}>
                                    <div className="email"
                                        id={message.userId}
                                    >
                                        {this.state.users.find(user => user.id === message.userId).email}
                                        <button onClick={() => {
                                            this.props.history.push(`/messages/${message.id}/edit`)
                                        }} className="btn edit-button">
                                            Edit
                                        </button>
                                    </div>
                                    <div className="message">
                                        {message.message}
                                    </div>
                                </li>
                            } else {
                                return <li className="card-text otherMessages" key={message.id}>
                                    <a className="email nav-link"
                                        href="/"
                                        onClick={this.handleAddFriend}
                                    >
                                        {this.state.users.find(user => user.id === message.userId).email}
                                    </a>
                                    <div className="message">
                                        {message.message}
                                    </div>
                                </li>
                            }
                        })}
                    </ul>
                    <form className="card-footer message-form">
                        <input onChange={this.handleChange} id="message" value={this.state.message} className="input mr-3"></input>
                        <button onClick={this.handleSubmit} className="btn btn-primary">Send</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default Messages