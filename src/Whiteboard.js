"use strict"

import React, { Component } from 'react'

import Header from './Header'

class Dashboard extends Component {
  constructor(props) {
    super(props)
  } 

  render() {
    return (
      <div style = {{ display: this.props.display }} >
        <Header user = {this.props.user}
                logout={this.props.logout}
                onSelectLink={this.props.onSelectLink}
        />
        <div className = "w3-container">
          <h2> White board</h2>
        </div>
      </div>
    )
  }
}

module.exports = Dashboard