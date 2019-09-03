import React, { Component } from 'react'
import TaskCard from './TaskCard'
import TaskManager from '../../modules/TaskManager'

class TaskList extends Component {
    //define here what this component needs to render
    state = {
        tasks: [],
    }

    componentDidMount(){
        console.log("Task List: ComponentDidMount");
        TaskManager.getAll()
        .then(tasks => {
            this.setState({
                tasks: tasks
            });
        });
    }

    render() {
        console.log("TaskList: Render");
        return(
            <React.Fragment>
                <section className="section-content">
                    <button type="button"
                    className="btn"
                    onClick={()=>{this.props.history.push("tasks/new")}}>
                    Add Task
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.tasks.map(task => (
                        <TaskCard
                        key={task.id}
                        task={task}
                        deleteTask={this.deleteTask}
                        {...this.props}
                        />
                    ))}
                </div>
            </React.Fragment>
        )
    }
    deleteTask = id => {
        TaskManager.delete(id).then(() => {
            TaskManager.getAll().then(newTask => {
            this.setState({
              tasks: newTask
            });
          });
        });
      };

}
export default TaskList;