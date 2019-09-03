import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import RegistrationForm from "./auth/RegistrationForm"
import Home from "./home/Home"
import LoginForm from "./auth/LoginForm"
import Tasks from "./task/TaskList"
import TaskForm from "./task/TaskForm"
import TaskEditForm from "./task/taskEditForm"

export default class ApplicationViews extends Component {
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null 

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

        {/* <Route
          path="/friends" render={props => {
            return (this.isAuthenticated 
              ? <Friends {...props} /> 
              : <Redirect to="/login"/>)
          }}
        />

        <Route
          path="/messages" render={props => {
            return (this.isAuthenticated 
              ? <Messages {...props} /> 
              : <Redirect to="/login"/>)}}
        />*/}

        <Route
          path="/tasks" render={props => {
            return (this.isAuthenticated 
              ? <Tasks {...props} /> 
              : <Redirect to="/login"/>)
          }}
        />
        <Route
          exact path="/tasks/new" 
          render={props => {
            return <TaskForm {...props} />;
          }}
        />
        <Route
          exact path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return <TaskEditForm {...props} />;
          }}
        />
        {/*<Route
          path="/news" render={props => {
            return (this.isAuthenticated 
              ? <News {...props} /> 
              : <Redirect to="/login"/>)
          }} 
        />
        <Route
          path="/events" render={props => {
            return (this.isAuthenticated 
              ? <Events {...props} /> 
              : <Redirect to="/login"/>)
          }}
        /> */}

      </React.Fragment>
    );
  }
}
