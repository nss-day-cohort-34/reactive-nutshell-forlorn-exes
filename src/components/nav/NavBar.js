import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    handleLogout() {
        console.log("pre-clear sessionStore", sessionStorage);
        console.log("pre-clear localStore", localStorage);
        sessionStorage.clear();
        localStorage.clear();
        console.log("post-clear sesionStore", sessionStorage);
        console.log("post-clear localStore", localStorage);
    }

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/news">News</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/messages">Messages</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/tasks">Tasks</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/events">Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link"
                            to="/"
                            onClick={this.handleLogout} >
                            Logout</Link>
                    </li>
                </ul>

                <Link className="logout" onClick={() => sessionStorage.clear()} to="/">Logout</Link>
            </nav>

        )
    }
}

export default NavBar
