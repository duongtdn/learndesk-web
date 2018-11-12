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
        <div className='w3-sidebar w3-bar-block w3-white w3-card-4' 
             style={{ width: '300px', right: 0, zIndex:1000, display }}
        >
          <span className="w3-button w3-display-topright" onClick={this.props.close}>X</span>
          <div className="w3-bar-item sidebar-user">
            <img src={user.profile.picture}
                 className="w3-image w3-round " 
                 width={60} height={60}
                 alt="user picture" />
            <span className="w3-margin"> {user.profile.displayName || user.profile.userName} </span>        
          </div>

          <hr />

          <button className="w3-bar-item w3-button" onClick= {this.onClick('dashboard')}> Dash Board </button>
          <button className="w3-bar-item w3-button" onClick= {this.onClick('app')}> Study Room </button>

          <hr />

          <div style={{textAlign: 'center'}} >
            <button className="w3-button w3-border w3-border-orange w3-hover-orange w3-hover-opacity w3-margin" 
                        onClick={this.props.logout}
              > 
                Logout 
            </button>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  onClick(link) {
    return () => {
      this.props.onClick(link);
      this.props.close()
    }
  }

}

export default SideBar