"use strict"

import React, { Component } from 'react'

class SideBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.user) {
      const user = this.props.user;
      const email = user.profile.email;
      const display = this.props.show ? 'block' : 'none';
      return (
        <div className='w3-sidebar w3-bar-block w3-white w3-card-4 w3-animate-right' 
             style={{ width: '250px', right: 0, zIndex:1000, display }}
        >
          <span className="w3-button w3-display-topright" onClick={this.props.close}>X</span>
          <div className="w3-bar-item w3-border-bottom sidebar-user">
            <img src={user.profile.picture}
                 className="w3-image w3-round align-center-img" 
                 width={60} height={60}
                 alt="user picture" />
            <p className="align-center-text"> {email} </p>
            <button className="w3-button w3-block" 
                    onClick={this.props.logout}
            > 
              Logout 
            </button>
          </div>
          <a href="#" className="w3-bar-item w3-button">Home</a>
          <a href="#" className="w3-bar-item w3-button">Link 1</a>
        </div>
      )
    } else {
      return null;
    }
  }

}

export default SideBar