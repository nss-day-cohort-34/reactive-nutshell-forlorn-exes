import React, { Component } from 'react'


class TaskCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <h3>Task: <span>{this.props.task.name}</span></h3>
          <p>Completion Date: <span>{this.props.task.completionDate}</span></p>
          <input type="checkbox"></input>


          <button type="button"
            onClick={() => {this.props.history.push(`/tasks/${this.props.task.id}/edit`)}}>Edit</button>
          <button type="button" 
            onClick={() => this.props.deleteTask(this.props.task.id)}>Delete Task</button>
        </div>
      </div>
    );
  }
}

export default TaskCard;