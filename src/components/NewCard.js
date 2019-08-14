import React from 'react'
import Aux from '../hoc/AuxHoc'
class NewCard extends React.Component {
  state = {
    value: ""
  }
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    })
  }
  onAdd = () => {
    this.props.onAdd(this.state.value)
    this.props.onToggle()
  }
  render() {
    const content = this.props.isAdding ?
      <div className={"addBox" + " " + this.props.styles}>
        <input placeholder={this.props.title} className="addInput" onChange={this.onChange} style={{ height: '36px', padding: '5px', width: '100%', marginBottom: '3px', borderRadius: '3px' }} />
        <button onClick={this.onAdd} style={{ height: '30px', width: '50px', color: 'white', backgroundColor: 'rgb(90,172,68)', padding: '0', borderWidth: '0', outline: 'none', borderRadius: '2px' }}>Add</button>
        <button onClick={this.props.onToggle} style={{ height: '30px', width: '30px', backgroundColor: 'transparent', padding: 'auto', borderWidth: '0', outline: 'none', borderRadius: '2px' }}>X</button>
      </div >
      :
      <div className={"listBox" + " " + this.props.styles} onClick={this.props.onToggle}>
        <a className="addButton" style={{ borderRadius: '3px', padding: '4px' }}>+ {this.props.title}</a>
      </div>
    return (
      <Aux>{content}</Aux>
    )
  }
}

export default NewCard;