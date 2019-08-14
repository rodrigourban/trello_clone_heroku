import React from 'react';
import { connect } from 'react-redux';
import * as apiActions from '../store/actions/api'
const editable = (WrappedComponent) => {
  class Editable extends React.Component {
    state = {
      editing: false
    }

    toggleEdit = (e) => {
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel()
      } else {
        this.edit()
      }
    }

    edit = () => {
      this.setState({ editing: true }, () => {
        this.domElm.focus();
      })
    }

    save = () => {
      this.setState({
        editing: false
      }, () => {
        if (this.isValueChanged()) {
          console.log(this.props)
          if (this.props.taskID) {
            this.props.onUpdateTask(this.props.boardID, this.props.listID, { title: this.domElm.textContent, task_list: this.props.listID }, this.props.taskID)
          } else {
            this.props.onUpdateList(this.props.boardID, { title: this.domElm.textContent, board: this.props.boardID }, this.props.listID)
          }
        }
      })
    }

    cancel = () => {
      this.setState({
        editing: false
      })
    }

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    }

    handleKeyDown = (e) => {
      const { key } = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save()
          break
      }
    }
    render() {
      let editOnClick = true;
      const { editing } = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick
      }
      return (
        <WrappedComponent
          className={editing ? 'editing' : ''}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={(domNode) => {
            this.domElm = domNode
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...this.props}
          style={{ textOverflow: 'ellipsis', wordBreak: 'break-all', whiteSpace: 'normal' }}
        >
          {this.props.value}
        </WrappedComponent>
      )
    }
  }

  const mapDistpatchToProps = (dispatch) => {
    return {
      onUpdateList: (boardID, value, listID) => dispatch(apiActions.createList(boardID, value, listID)),
      onUpdateTask: (boardID, listID, value, taskID) => dispatch(apiActions.createTask(boardID, listID, value, taskID))
    }
  }

  return connect(null, mapDistpatchToProps)(Editable)
}

export default editable;