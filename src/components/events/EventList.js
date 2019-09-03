import React, { Component } from 'react'
//import the components we will need
import EventCard from './EventCard'
import EventsManager from '../../modules/EventsManager'
import './EventList.css'

class EventList extends Component {
    //define what this component needs to render
    state = {
        events: [],
    }

    componentDidMount() {
        EventsManager.getAll()
            .then((events) => {
                if(events.length > 0){
                events[0].isFirst = true
                }
                this.setState({
                    events: events
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
                        if (newEvents.length > 0){
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