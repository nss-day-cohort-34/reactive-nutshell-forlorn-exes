import React, { Component } from 'react'
//import the components we will need
import EventCard from './EventCard'
import EventsManager from '../../modules/EventsManager'
import './EventList.css'
import UserManager from '../../modules/UserManager'

class EventList extends Component {
    //define what this component needs to render
    state = {
        events: [],
    }

    componentDidMount() {
        const eventsToDisplay = []
        const activeUser = JSON.parse(sessionStorage.getItem("credentials"))

        UserManager.getFriendsUserId(activeUser.activeUserId)
            .then((friends) => {
                const ourIds = friends.map(friend => {
                    return friend.userId
                })
                ourIds.push(activeUser.activeUserId)
                console.log(ourIds)
                ourIds.map(id => {
                    EventsManager.getFriendsEvents(id).then((events) => {
                        events.forEach(event => {
                            eventsToDisplay.push(event)
                        })
                    })
                        .then(() => {
                            if (eventsToDisplay.length > 0) {
                                eventsToDisplay[0].isFirst = true
                            }
                            const newState = { events: eventsToDisplay }
                            this.setState(newState)
                        })
                })
            })
    }


    render() {
        return (
            <section className="section-content">
                <div className="eventsWindow">
                    <div className="container-cards">
                        {this.state.events.map(event =>
                            <EventCard key={event.id} event={event} deleteEvent={this.deleteEvent} {...this.props} />
                        )}
                    </div>
                </div>
                <div className="btnDiv">
                    <button type="button"
                        className="eventButton"
                        onClick={() => { this.props.history.push("/events/new") }}>
                        Add New Event</button>
                </div>
            </section>
        )
    }
    deleteEvent = id => {
        EventsManager.delete(id)
            .then(() => {
                EventsManager.getAll()
                    .then((newEvents) => {
                        if (newEvents.length > 0) {
                            newEvents[0].isFirst = true
                        }
                        this.setState({
                            events: newEvents
                        })
                    })
            })
    }
}

export default EventList