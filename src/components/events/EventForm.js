import React, { Component } from 'react';
import EventsManager from '../../modules/EventsManager';
import './EventForm.css'

class EventForm extends Component {
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        // userId: sessionStorage.getItem("credentials.activeUserId"),
        loadingStatus: false
    };  

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    /*  Local method for validation, set eventLocation, create event      object, invoke the EventsManager post method, and redirect to the full event list
    */
    createNewEvent = evt => {
        evt.preventDefault();
        if (this.state.eventName === "" || this.state.eventDate === "" || this.state.eventLocation === "") {
            window.alert("Please fill out all input fields");
        } else {
            var userInfo = JSON.parse(sessionStorage.getItem("credentials"))
            var activeUserNum = userInfo.activeUserId
            this.setState({ loadingStatus: true });
            const event = {
                name: this.state.eventName,
                date: this.state.eventDate,
                location: this.state.eventLocation,
                userId: activeUserNum
            };

            // Create the event and redirect user to event list
            EventsManager.post(event)
            .then(() => this.props.history.push("/events"));
        }
    };

    render(){

        return(
            <>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="eventName"
                        placeholder="event name"
                        />
                        <label htmlFor="eventName">Event Name</label>
                        <input
                        type="date"
                        required
                        onChange={this.handleFieldChange}
                        id="eventDate"
                        />
                        <label htmlFor="eventDate">eventDate</label>
                        <input
                        type="text"
                        required
                        onChange={this.handleFieldChange}
                        id="eventLocation"
                        placeholder="event location"
                        />
                        <label htmlFor="eventName">Event Location</label>
                    </div>
                    <div className="alignRight">
                        <button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.createNewEvent}
                        >Add Event</button>
                    </div>
                </fieldset>
            </form>
        </>
        )
    }
}

export default EventForm