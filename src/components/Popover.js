import React from 'react';
import axios from 'axios';
import Editable from '../hoc/Editable'
const colors = [
  'rgb(0,121,191)',
  'rgb(210,144,52)',
  'rgb(81,152,57)',
  'rgb(176,70,50)',
  'rgb(137,96,158)',
  'rgb(205,90,145)',
  'rgb(131,140,145)'
]

class Popover extends React.Component {
  state = {
    title: null,
    color: 'rgb(0,121,191)',
  }

  handleClose = (event) => {
    if (event.currentTarget === event.target) {
      this.props.closeModal()
    }
  }

  handleCreate = () => {
    const payload = {
      title: this.state.title,
      background: this.state.color
    }
    axios.post('http://localhost:8000/api/boards/', payload)
      .then(res => {
        console.log(res)
        this.props.closeModal()
      })
      .catch(err => {
        throw (err)
      })
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleColor = (clickedColor) => {
    this.setState({
      color: clickedColor
    })
  }

  render() {
    const colorButtons = colors.map((color, key) => {
      return (
        <div key={key} style={{ height: '100%', width: '100%', backgroundColor: color }} onClick={() => this.handleColor(color)}></div>
      )
    })
    return (
      this.props.isOpen ?
        <div onClick={this.handleClose} style={{ backgroundColor: 'rgba(1,1,1,0.4)', width: '100%', height: '100%', position: 'absolute', zIndex: '5' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr 1fr 1fr',
              gridColumnGap: '5px', gridRowGap: '5px'
            }}>

              <div style={{ backgroundColor: this.state.color, gridArea: '1 / 1 / 4 / 4' }}>
                <input placeholder="Add board title x" onChange={this.handleChange} />
              </div>

              <div style={{ gridArea: '1 / 4 / 2 / 5', width: '100%', height: '100%', backgroundColor: colors[0] }} onClick={() => this.handleColor(colors[0])}></div>
              <div style={{ gridArea: '1 / 5 / 2 / 6', width: '100%', height: '100%', backgroundColor: colors[1] }} onClick={() => this.handleColor(colors[1])}></div>
              <div style={{ gridArea: '2 / 4 / 3 / 5', width: '100%', height: '100%', backgroundColor: colors[2] }} onClick={() => this.handleColor(colors[2])}></div>
              <div style={{ gridArea: '2 / 5 / 3 / 6', width: '100%', height: '100%', backgroundColor: colors[3] }} onClick={() => this.handleColor(colors[3])}></div>
              <div style={{ gridArea: '3 / 4 / 4 / 5', width: '100%', height: '100%', backgroundColor: colors[4] }} onClick={() => this.handleColor(colors[4])}></div>
              <div style={{ gridArea: '3 / 5 / 4 / 6', width: '100%', height: '100%', backgroundColor: colors[5] }} onClick={() => this.handleColor(colors[5])}></div>

              <div disabled={this.state.title === null} onClick={this.handleCreate} style={{ gridArea: '4 / 1 / 5 / 3' }}><button>Create Board</button></div>

            </div>
          </div>
        </div>
        :
        null
    )
  }
}

export default Popover;