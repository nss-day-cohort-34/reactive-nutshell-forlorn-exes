import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './EventCard.css'

class EventCard extends Component {
  render() {
  return (
    <div className="card">
        <div className="card-content">
          <h1 className={this.props.event.isFirst
        ? "makeBold"
        : "eventNameHeader"}>{this.props.event.name}</h1>
          <p>Date: {this.props.event.date}</p>
            <p>{this.props.event.location}</p>
          <button type="button"
        onClick={() => {this.props.history.push(`/events/${this.props.event.id}/edit`)}}>Edit Details</button>
          <button type="button" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</button>
        </div>
    </div>
  );
}
}

export default EventCard;