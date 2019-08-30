import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager"
import "bootstrap/dist/css/bootstrap.min.css"


class RegistrationForm extends Component {

    state = {
        email: "",
        emailConfirm: "",
        password: "",
        passwordConfirm: "",
        activeUserId: 0
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    handleLogin = (e) => {
        e.preventDefault()
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
    handleRegister = evt => {
        evt.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            window.alert("Please fill out registration form!");
        } else {
            if (this.state.email === this.state.emailConfirm && this.state.password === this.state.passwordConfirm) {
                this.setState({ loadingStatus: true });
                const user = {
                    email: this.state.email,
                    password: this.state.password
                };
                UserManager.getAll()
                    .then(users => {
                        const existingUser = users.find(user => {
                            return user.email === this.state.email
                        })
                        if (existingUser !== undefined) {
                            // Create the user and redirect user to her/his home
                            UserManager.post(user)
                                .then(user => {
                                    console.log(user);
                                    // this.setState(activeUserId = user.id)
                                })
                                .then(() => this.props.history.push("/"));
                        }
                        else {
                            window.alert("User already exists!")
                        }
                    }
                    )
            }
        }

    };

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
                                type="email"
                                required
                                onChange={this.handleFieldChange}
                                id="emailConfirm"
                                placeholder="Confirm your email"
                            />
                            <label htmlFor="emailConfirm">Confirm Email</label>
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="password"
                                placeholder="create password"
                            />
                            <label htmlFor="password">password</label>
                            <input
                                type="password"
                                required
                                onChange={this.handleFieldChange}
                                id="passwordConfirm"
                                placeholder="confirm password"
                            />
                            <label htmlFor="passwordConfirm">confirm password</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.handleRegister}
                            >Submit</button>
                        </div>
                        <div>
                            <Link to={`/login`}><button>Already have an account?</button></Link>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }
}
export default RegistrationForm
