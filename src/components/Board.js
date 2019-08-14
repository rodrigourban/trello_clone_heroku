import React from 'react';
import List from './List';
import NewCard from './NewCard'
import { connect } from 'react-redux'
import * as apiActions from '../store/actions/api'
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import axios from 'axios'


class Board extends React.Component {

  state = {
    lists: [],
    isAdding: false,
    background: '',
    boardID: this.props.match.params.boardID,
  }

  componentDidMount() {
    this.loadData()
  }

  loadData = () => {
    this.props.GetLists(this.state.boardID)
  }

  onToggle = () => {
    this.setState({
      isAdding: !this.state.isAdding
    })
  }
  onCreateList = (value) => {
    this.props.CreateList(this.state.boardID, value)

  }

  onDeleteList = (listID) => {
    this.props.DeleteList(this.state.boardID, listID);
  }
  onCreateTask = (listID, payload) => {
    this.props.CreateTask(this.state.boardID, listID, payload)
  }

  onDeleteTask = (taskID) => {
    this.props.DeleteTask(this.state.boardID, taskID)
  }

  updateList = (value, index) => {
    this.props.CreateList(this.state.boardID, value, index)

  }
  deleteTask = (listID, taskID) => {
    this.props.onDeleteTask(this.state.boardID, listID, taskID)

  }
  sortItems = (firstItem, secondItem, tasklistID) => {
    this.props.SwapTask(this.state.boardID, tasklistID, firstItem, secondItem)
  }
  render() {
    const currentList = this.props.lista.map((el) => (
      <List className="list"
        title={el.title}
        content={el.tasks}
        key={el.id}
        id={el.id}
        board={el.board}
        createTask={this.onCreateTask}
        deleteTask={this.onDeleteTask}
        deleteList={this.onDeleteList}
        sortItems={this.sortItems}
      />
    ))
    return (
      <div className="board" >
        <DndProvider backend={HTML5Backend}>
          {currentList}
          <div className="listContainer" >
            <NewCard isAdding={this.state.isAdding} title="Add a list" onToggle={this.onToggle} onAdd={this.onCreateList}></NewCard>
          </div>
        </DndProvider>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    lista: state.api.lists,
    isAddingLists: state.isAddingList,
    isAddingTask: state.isAddingTask
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GetLists: (id) => dispatch(apiActions.getLists(id)),
    DeleteList: (boardID, id) => dispatch(apiActions.deleteList(boardID, id)),
    CreateList: (boardID, id, value) => dispatch(apiActions.createList(boardID, id, value)),
    CreateTask: (boardID, listID, payload) => dispatch(apiActions.createTask(boardID, listID, payload)),
    DeleteTask: (boardID, listID, taskID) => dispatch(apiActions.deleteTask(boardID, listID, taskID)),
    SwapTask: (boardID, tasklistID, firstID, secondID) => dispatch(apiActions.swapTask(boardID, tasklistID, firstID, secondID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);