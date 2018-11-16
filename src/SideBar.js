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
             style={{ width: '300px', right: 0, top: 0, zIndex: 1000, display }}
        >
          <span className="w3-button w3-display-topright w3-red" onClick={this.props.close}>X</span>
          <div className="w3-bar-item sidebar-user w3-border-bottom" style={{ padding: '32px 16px', margin: '16px 0px' }}>
            <div className="w3-cell">
              <img src={user.profile.picture}
                  className="w3-image w3-round " 
                  width={60} height={60}
                  alt="user picture" />
              </div>
            <div className="w3-container w3-cell w3-cell-middle"> {user.profile.displayName || user.profile.userName} </div>        
          </div>


          <button className="w3-bar-item w3-button" onClick= {this.onClick('whiteboard')}> <i className="fa fa-area-chart w3-text-blue" /> White Board </button>
          <button className="w3-bar-item w3-button" onClick= {this.onClick('app')}> <i className="fa fa-laptop w3-text-blue" /> Study Room </button>

          <hr />

          <div style={{textAlign: 'center'}} >
            <button className="w3-button w3-border w3-border-orange w3-hover-orange w3-hover-opacity w3-margin" 
                        onClick={this.props.logout}
              > 
                <i className="fa fa-sign-out" /> Logout 
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