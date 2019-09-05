import React, {Component} from "react"
import UserSearch from "./Search"



class FriendsList extends Component {

    handleDelete = (event) => {
        this.props.deleteFriend(event.target.id)
    }

    render() {
        return (
            <div className="card">
                <h1 className="card-header">Friends List</h1>
                <div className="card-body">
                {
                    this.props.friends.map(friend => {
                    return  <div key={friend.user.id}>

                                <p>{friend.user.email}</p><button
                                id={friend.id} className="btn btn-danger btn-sm mb-2"
                                onClick={this.handleDelete}
                                >Delete Friend</button>

                            </div>

                    })
                }
                </div>
                <div className="card-footer">
                    <UserSearch addFriend={this.props.addFriend}/>
                </div>
            </div>
        )
    }
}

export default FriendsList
