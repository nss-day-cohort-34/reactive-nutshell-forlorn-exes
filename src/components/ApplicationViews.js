import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import RegistrationForm from "./auth/RegistrationForm"
import Home from "./home/Home"
import LoginForm from "./auth/LoginForm"
import Tasks from "./task/TaskList"
import TaskForm from "./task/TaskForm"
import TaskEditForm from "./task/taskEditForm"
import TaskList from  "./task/TaskList"
import NewsForm from "./news-scripts/components/NewsForm"
import NewsEditForm from "./news-scripts/components/NewsEditForm"
import NewsList from "./news-scripts/components/NewsList"
import EventForm from "./events/EventForm"
import EventList from "./events/EventList"
import EventEditForm from "./events/EventEditForm"
import Messages from "./messages/messagelist"
import MessageEditForm from "./messages/messageEditForm"
import UserManager from "../modules/UserManager"

class ApplicationViews extends Component {

  state = {
    friends: []
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  componentDidMount() {
    var userInfo = JSON.parse(sessionStorage.getItem('credentials'));
    if (this.isAuthenticated()) {
      var userid = userInfo.activeUserId
      this.loadData(userid)
    }
  }

  loadData = (userid) => {
    const newState = {
    }
    UserManager.getFriendsUserId(userid)
      .then(friends => newState.friends = friends)
      .then(() => this.setState(newState))
  }

  addFriend = (user) => {
    if (!user) {
      return window.alert("An account with this username doesn't exist")
    } else if (user.email) {
      const userInfo = JSON.parse(sessionStorage.getItem('credentials'));
      const userid = userInfo.activeUserId
      if (user.id === user.email) {
        window.alert("You can't add yourself as a friend.")
      } else if (this.state.friends.find(friend => friend.user.email.toLowerCase() === user.email)) {
        window.alert("You already added this user.")
      } else {
        if (window.confirm(`Would you like to add ${user.userName} as a friend?`)) {
          const newFriend = {
            userId: user.id,
            currentUserId: userid,
          }
          UserManager.postItem("friends", newFriend)
            .then(() => this.loadData(userid))
        } else {
          // window.alert("Username not found")
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
           return (this.isAuthenticated() 
              ? <Home {...props} /> 
              : <Redirect to="/login"/>)
           }}

        />
        <Route
          exact path="/register" render={props => {
            return <RegistrationForm {...props} />
          }}
        />
        <Route
          exact path="/login" render={props => {
            return <LoginForm {...props} />
          }}
        />
        <Route exact
          path="/messages" render={props => {
            return (this.isAuthenticated()
              ? <Messages {...props} LoadData={this.loadAllData} addFriend={this.addFriend} />
              : <Redirect to="/login" />)
          }}
        />
        <Route
          path="/messages/:messageId(\d+)/edit" render={props => {
            return (this.isAuthenticated()
              ? <MessageEditForm {...props} />
              : <Redirect to="/login" />)
          }}
        />



        <Route
          exact path="/tasks" render={props => {
            return (this.isAuthenticated()
              ? <TaskList {...props} />
              : <Redirect to="/login"/>)
          }}
        />
        <Route
          exact path="/news" render={props => {
            return (this.isAuthenticated()
              ? <NewsList {...props} />
              : <Redirect to="/login" />)
          }}
        />
        <Route
          exact path="/tasks/new" 
          render={props => {
            return (this.isAuthenticated()
            ? <TaskForm {...props} />
            : <Redirect to="/login" />)
          }}
        />
        <Route
          exact path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return (this.isAuthenticated()
            ? <TaskEditForm {...props} />
            : <Redirect to="/login" />)
          }}
        />
        <Route
         exact path="/events" render={props => {
            return (this.isAuthenticated() 
              ? <EventList {...props} /> 
              : <Redirect to="/login"/>)
          }}
        />
        <Route
          path="/events/new" render={props => {
            return (this.isAuthenticated() 
              ? <EventForm {...props} /> 
              : <Redirect to="/login"/>)
          }}
        />
        <Route
          path="/events/:eventId(\d+)/edit" render={props => {
            return (this.isAuthenticated()
           ? <EventEditForm {...props} />
           : <Redirect to="/login"/>)
          }}
        />
      </React.Fragment>
    );
  }
}

export default ApplicationViews