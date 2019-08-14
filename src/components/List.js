import React from 'react';
import NewCard from './NewCard'
import Editable from '../hoc/Editable';
import Task from './Task'

class List extends React.Component {
  state = {
    value: "",
    isAdding: false,
  };
  onToggle = () => {
    this.setState({
      isAdding: !(this.state.isAdding)
    })
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }
  onCreateCard = (value) => {
    this.props.createTask(this.props.id, value)
  }
  onDelete = (taskID) => {
    this.props.deleteTask(taskID)
  }
  onDeleteList = (listID) => {
    this.props.deleteList(listID)
  }
  moveTask = (id, idd) => {
    //Call sort function and refresh
    this.props.sortItems(id, idd, this.props.id)
  }
  moveList = (id, idd) => {

    console.log(id, idd)
  }
  render() {
    const EditTitle = Editable('div')
    return (
      <div className="listContainer list" style={{ padding: '8px' }}>
        <div className="list-title" style={{ marginBottom: '8px' }} ><EditTitle className="text" value={this.props.title} listID={this.props.id} boardID={this.props.board}></EditTitle><button className="button" onClick={() => this.onDeleteList(this.props.id)}>...</button></div>
        <div className="list-content">
          {this.props.content.map(task =>
            (<Task
              boardID={this.props.board}
              key={task.id}
              value={task.title}
              listID={this.props.id}
              id={task.id}
              moveTask={this.moveTask}
              onDelete={this.onDelete}
            />
            ))}
        </div>
        <NewCard styles="listAdd" isAdding={this.state.isAdding} title="Add a card" onToggle={this.onToggle} onAdd={this.onCreateCard}></NewCard>
      </div>
    )
  }
}

export default List;