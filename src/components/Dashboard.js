import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import * as modalActions from '../store/actions/modal';
import axios from 'axios';
import logo from '../assets/Boards.png'

class Dashboard extends React.Component {
  state = {
    boards: []
  }
  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    axios.get('http://localhost:8000/api/boards')
      .then(res => {
        console.log(res)
        this.setState({
          boards: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
  openModal = () => {
    this.props.openModal()
  }

  deleteBoard = (id) => {
    axios.delete(`http://localhost:8000/api/boards/${id}`)
      .then(res => {
        console.log("borrado exitosamente")
        this.loadData()
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const content = this.state.boards.map((board) => {
      return (
        <NavLink to={`/board/${board.id}`} className="dashboard-board" style={{
          height: '100px', backgroundColor: board.background, borderRadius: '5px',
          padding: '5px', textDecoration: 'none', color: '#fffff'
        }}>
          <div className="dashboard-board-title" style={{ position: 'relative', top: '10px', left: '2px' }
          }>
            <div style={{ fontSize: '16px', lineHeight: '20px', color: '#fffff', fontWeight: '700', color: 'rgb(255,255,255)' }}>{board.title}</div>
          </div>
          {/* <button onClick={() => this.deleteBoard(board.id)}>delete</button> */}
        </NavLink >
      )
    })
    return (
      <div className="dashboard" style={{ width: '90%', marginLeft: '1.5rem', marginTop: '1rem' }}>
        <div className="dashboard-title" style={{ marginBottom: '5px', padding: '5px', lineHeight: '25px' }}><img src={logo} height="25" width="25" style={{ marginRight: '5px', verticalAlign: 'bottom' }} />Personal Boards</div>
        <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'auto auto auto auto', columnGap: '10px', rowGap: '10px' }}>
          {content}
          <div style={{ backgroundColor: 'transparent', margin: 'auto' }} onClick={this.openModal}>
            Create new board
          </div>
        </div>
      </div >
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openModal: () => dispatch(modalActions.openModal()),
  }
}

export default connect(null, mapDispatchToProps)(Dashboard)