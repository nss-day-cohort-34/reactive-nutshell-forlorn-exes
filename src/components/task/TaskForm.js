import React, { Component } from 'react';
import TaskManager from '../../modules/TaskManager';

class TaskForm extends Component {
    state = {
        taskName: "",
        taskCompletionDate: "",
        taskIsCompleted: false,
        taskUserId: "",
        loadingStatus: false,
    };
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };
    constructNewTask = evt => {
        evt.preventDefault();
        if (this.state.taskName === "") {
            window.alert("Please input a new task");
        } else {
            this.setState({ loadingStatus: true });
            const credentialList = JSON.parse(sessionStorage.getItem("credentials"))
            const task = {
                name: this.state.taskName,
                completionDate: this.state.taskCompletionDate,
                isCompleted: this.state.taskIsCompleted,
                userId: credentialList.activeUserId,
            };

            TaskManager.post(task).then(()=> {TaskManager.getAll()}).then(newTask => {
                this.setState({
                  tasks: newTask
                })})
            .then(() => this.props.history.push("/tasks"));
        }
    }
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
                            id="taskName"
                            placeholder="Task name"
                            />
                            <label htmlFor="taskName">Task Name</label>
                            <input
                            type="date"
                            required
                            onChange={this.handleFieldChange}
                            id="taskCompletionDate"
                            placeholder="Task date"
                            />
                        </div>
                        <div className="alignRight">
                            <button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewTask}
                            >Submit Task</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )
    }

}    
export default TaskForm