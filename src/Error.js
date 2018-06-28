"use strict"

import React, { Component } from 'react'

class Error extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let errorMessage = <p> Error found!!! </p>;
    if (this.props.errCode === 403) {
      errorMessage = <p> Your enrollement is not active yet. </p>
    }
    if (this.props.errCode === 404) {
      errorMessage = <p> You have not enrolled this course or this course is not available. </p>
    }
    console.log(this.props.errCode)
    return (
      <div style={{display: this.props.display}} >
        <div className="w3-bar w3-black" style={{fontFamily: 'Caveat', fontSize: '22px'}} >
          <a href="#" className="w3-bar-item w3-button w3-border-right">Learn <span className="w3-text-blue">Desk</span></a>
        </div>
        <div className="w3-container w3-text-red" style={{margin: '32px 0'}} >        
          {errorMessage}
          <a href={this.props.naviLink} className="w3-button w3-blue"> Go to the enroll page </a>
        </div>
      </div>
    )
  }
}

export default Error