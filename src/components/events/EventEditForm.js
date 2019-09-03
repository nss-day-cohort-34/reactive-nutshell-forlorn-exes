import React, { Component } from "react"
import EventsManager from "../../modules/EventsManager"

class EventEditForm extends Component {
    //set the initial state
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEvent = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedEvent = {
            id: this.props.match.params.eventId,
            name: this.state.eventName,
            date: this.state.eventDate,
            location: this.state.eventLocation
        };

        EventsManager.update(editedEvent)
            .then(() => this.props.history.push("/events"))
    }

    componentDidMount() {
        EventsManager.get(this.props.match.params.eventId)
            .then(event => {
                this.setState({
                    eventName: event.name,
                    eventDate: event.date,
                    eventLocation: event.location,
                    loadingStatus: false,
                });
            });
    }

    render() {
        return (
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
                                value={this.state.eventName}
                            />
                            <label htmlFor="eventName">Event Name</label>
                            <input
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                id="eventDate"
                                value={this.state.eventDate}
                            />
                            <label htmlFor="eventDate">Event Date</label>
                            <input
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="eventLocation"
                                value={this.state.eventLocation}
                            />
                            <label htmlFor="eventLocation">Event Location</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.updateExistingEvent}
                            >Update Event</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default EventEditForm