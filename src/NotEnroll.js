"use strict"

import React, { Component } from 'react'

class NotEnroll extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
      <div style={{display: this.props.display}} >
        <div className="w3-bar w3-black" style={{fontFamily: 'Caveat', fontSize: '22px'}} >
          <a href="#" className="w3-bar-item w3-button w3-border-right">Learn <span className="w3-text-blue">Desk</span></a>
        </div>
        <div className="w3-container w3-text-red" style={{margin: '32px 0'}} >
          <p> You have not enrolled this course or your enrollement is not active yet. </p>
          <a href={this.props.naviLink} className="w3-button w3-blue"> Go to the enroll page </a>
        </div>
      </div>
    )
  }
}

export default NotEnroll