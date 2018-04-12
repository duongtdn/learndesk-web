"use strict"

import React, { Component } from 'react'

import style from './css/w3.css'

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const complete = '25%'
    return (
      <div className="w3-light-grey" style={{margin: '4px 0 4px 0'}}>
        <div className="w3-green" style={{height:'10px', width: complete}} />
      </div>
    )
  }
}

export default ProgressBar