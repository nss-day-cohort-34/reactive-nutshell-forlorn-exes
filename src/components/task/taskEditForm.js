import React, { Component } from "react"
import TaskManager from '../../modules/TaskManager';

class TaskEditForm extends Component {
    state = {
        taskName: "",
        taskCompletionDate: "",
        taskIsCompleted: "",
        taskUserId: "",
        loadingStatus: false,
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    updateExistingTask = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedTask = {
            id: this.props.match.params.taskId,
            name: this.state.taskName,
            completionDate: this.state.taskCompletionDate,
            isCompleted: this.state.taskIsCompleted,
            userId: this.state.taskUserId,
            };
  
        TaskManager.update(editedTask)
        .then(() => this.props.history.push("/tasks"))
    };

    componentDidMount() {
        TaskManager.get(this.props.match.params.taskId)
        .then(task => {
            this.setState({
              taskName: task.name,
              taskCompletionDate: task.completionDate,
              taskIsCompleted: task.isCompleted,
              taskUserId: task.userId
            });
        });
      };

      render() {
        return (
          <>
          <form>
            <fieldset>
              <div className="formgrid">
                <input
                  type="text"
                  required
                  className="form-control"
                  onChange={this.handleFieldChange}
                  id="taskName"
                  value={this.state.taskName}
                />
                <label htmlFor="taskName">Task name</label>
                <input
                    type="date"
                    required
                    onChange={this.handleFieldChange}
                    id="taskCompletionDate"
                    placeholder="Task date"
                    value={this.state.taskCompletionDate}
                />
                <label htmlFor="taskCompletionDate">Task Completion Date</label>
              </div>
              <div className="alignRight">
                <button
                  type="button" disabled={this.state.loadingStatus}
                  onClick={this.updateExistingTask}
                  className="btn btn-primary"
                >Submit</button>
              </div>
            </fieldset>
          </form>
          </>
        );
      }

}
export default TaskEditForm