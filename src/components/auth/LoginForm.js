import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"
import "bootstrap/dist/css/bootstrap.min.css"


class LoginForm extends Component {

    state = {
        email: "",
        password: "",
        activeUserId: 0
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleLogin = () => {
        // e.preventDefault()
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                activeUserId: this.state.activeUserId
            })
        )
        this.props.history.push("/");
    }

    /*  Local method for validation, set loadingStatus, create user object, invoke the UserManager post method, and redirect home page
    */
    handleLoginVersion1 = evt => {
        evt.preventDefault()
        UserManager.getAll()
            .then(users => {
                const currentUser = users.find(user => {
                    return user.email === this.state.email && user.password === this.state.password
                })
                if (currentUser !== undefined) {
                    // Create the user and redirect user to her/his home
                    this.setState({ activeUserId: currentUser.id })
                    this.handleLogin()
                }

                else {
                    window.alert("Invalid Login Credentials")
                }
            }
            )
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="email"
                                required
                                onChange={this.handleFieldChange}
                                id="email"
                                placeholder="Enter your email"
                            />
                            <label htmlFor="email">Email</label>

                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="Enter Password"
                            />
                            <label htmlFor="password">password</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleLoginVersion1}
                            >Login</button>
                        </div>
                        {/* <div>
                            {/* CHECKBOX: 
                            label: REMEMBER ME?
                            DEFAULT VALUE: unselected 
                            SOME FUNCTION: if (checked) {
                                JSON.parse(localStorage.setItem("storedUser", {
                                userInfo: info,
                                userInfo: info,
                                userInfo: info
                            }))
                            </div>} */}
                        <div>
                            <Link to={`/register`}><button>Sign up for free!</button></Link>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}
export default LoginForm
