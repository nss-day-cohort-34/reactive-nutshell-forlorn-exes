import React, { Component } from 'react'
import TaskCard from './TaskCard'
import TaskManager from '../../modules/TaskManager'

class TaskList extends Component {
    state = {
        tasks: [],
    }
    
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };



    componentDidMount(){
        TaskManager.getAll()
        .then(tasks => {
            this.setState({
                tasks: tasks
            });
        });
    }

    render() {
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
                        completeTask={this.completeTask}
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

    completeTask = id => {
        console.log(id)


    }  
}
export default TaskList;