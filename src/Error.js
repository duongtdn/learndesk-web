"use strict"

import React, { Component } from 'react'

import Header from './Header'

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
    return (
      <div style={{display: this.props.display}} >
        <Header user = {this.props.user}
                logout={this.props.logout}
        />
        <div className="w3-container w3-text-red" style={{margin: '32px 0'}} >        
          {errorMessage}
          <a href={this.props.naviLink} className="w3-button w3-blue"> Go to the enroll page </a>
        </div>
      </div>
    )
  }
}

export default Error