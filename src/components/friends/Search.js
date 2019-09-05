import React, {Component} from "react"
import UserManager from "../../modules/UserManager"

class UserSearch extends Component {



    state = {
        searchEmail: ""
    }

    // Updates local state based on changes of the search input

    handleChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
    }



    handleAddFriend = (event) => {
        event.preventDefault();


        UserManager.getAll()
            .then(userList => userList.find(user => user.email.toLowerCase() === this.state.searchEmail.toLowerCase()))
            .then(match => this.props.addFriend(match))
            .then(() => this.setState({
                searchEmail: ""
            }))

    }

    render() {
        return (
            <form className="form-group">
                <label>Add a New Friend</label>
                <input
                    type="text"
                    required
                    id="searchEmail"
                    value={this.state.searchEmail}
                    onChange={this.handleChange}
                    className="form-control userSearch"
                    placeholder="Search by Email"
                />
                <button
                    type="button"
                    className="btn btn-primary mt-2"
                    onClick={this.handleAddFriend}
                    >Find User</button>
            </form>
        )
    }
}

export default UserSearch