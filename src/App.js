import React from 'react';
import Board from './components/Board';
import Navbar from './components/Nav';
import Boardd from './components/Dashboard'
import Popover from './components/Popover';
import * as modalActions from './store/actions/modal'
import * as apiActions from './store/actions/api'
import Aux from './hoc/AuxHoc'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

class Main extends React.Component {
  render() {
    return (
      <Aux className="bija">
        <Popover isOpen={this.props.modalOpen} closeModal={this.props.closeModal} createBoard={this.props.createBoard} />
        <Router className="main">
          <Navbar></Navbar>
          <Route path="/" exact component={Boardd} />
          <Route path="/board/:boardID" component={Board} />
          <Route path="/create" component={Popover} />
        </Router>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    modalOpen: state.modal.modal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(modalActions.closeModal()),
    createBoard: (payload) => dispatch(apiActions.createBoard(payload))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);