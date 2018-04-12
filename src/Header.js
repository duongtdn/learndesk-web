"use strict"

import React, { Component } from 'react'

import style from './css/w3.css'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { showDropdown: false };

    this.toggleDropdown = this.toggleDropdown.bind(this);

  }


  render() {
    const topics = this.props.topics;
    const index = this.props.currentIndex || 0;
    const currentTopic = topics[index];
    const drop = this.state.showDropdown ? 'w3-show' : 'w3-hide';
    return (
      <div style={{marginBottom: '8px'}}>
        <div className="w3-bar w3-black" style={{fontFamily: 'Caveat', fontSize: '22px'}}>
          
          <a href="#" className="w3-bar-item w3-button w3-border-right">Learn <span className="w3-text-blue">Desk</span></a>
          
          <a href="#" className="w3-bar-item w3-button" onClick={this.toggleDropdown}> 
            <span > Topic {currentTopic.id} </span> &nbsp;
            <span className="w3-hide-small"> 
              <i className="fa fa-angle-right"></i>
              &nbsp; {currentTopic.name} 
            </span>
            &nbsp; <i className="fa fa-caret-down"></i>
          </a>
          
          <a href="#" className="w3-bar-item w3-button w3-right w3-green">
            <i className="fa fa-bars" />
          </a>

        </div>

        {/* dropdown  */}
        <div className={`w3-dropdown-content w3-light-grey ${drop}`} style={{fontFamily: 'Caveat', fontSize: '22px', padding: 0}}>
          {
            topics.map((topic,index) => (
              <a key = {topic.id} href="#" className="w3-button w3-border-bottom" style={{width: '100%', textAlign: 'left'}} onClick={() => this.changeTopic(index)}> 
                <div className="w3-text-blue"> Topic {topic.id} </div>
                <div style={{whiteSpace: 'normal'}}> {topic.name} </div>
              </a>
            ))
          }
        </div>
      </div>
    )
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  changeTopic(index) {
    this.setState({ showDropdown : false });
    this.props.onChangeTopic && this.props.onChangeTopic(index);
  }

}

export default Header