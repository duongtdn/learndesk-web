"use strict"

import React, { Component } from 'react'

import SideBar from './SideBar'

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = { showDropdown: false, showSideBar: false };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
    this.closeSideBar = this.closeSideBar.bind(this);
    this.getTopicCompletion = this.getTopicCompletion.bind(this);
    this.logout = this.logout.bind(this);
  }


  render() {
    const topics = this.props.topics;
    const index = this.props.currentIndex || 0;
    const currentTopic = topics && topics[index];
    const completion = this.getTopicCompletion();
    const drop = this.state.showDropdown ? 'w3-show' : 'w3-hide';
    return (
      <div style={{marginBottom: '8px'}}>
        <div className="w3-bar w3-black" style={{fontFamily: 'Caveat', fontSize: '22px'}}>
          
          <a href="#" className="w3-bar-item w3-button w3-border-right">Learn <span className="w3-text-blue">Desk</span></a>
          
          {
            topics ? 
              <a href="#" className="w3-bar-item w3-button" onClick={this.toggleDropdown}> 
                <span > Topic {currentTopic.id} </span> &nbsp;
                <span className="w3-hide-small"> 
                  <i className="fa fa-angle-right"></i>
                  &nbsp; {currentTopic.title} 
                </span>
                &nbsp; <i className="fa fa-caret-down"></i>
              </a>
              : null
          }
          
          
          <a href="#" className="w3-bar-item w3-button w3-right w3-green"
             onClick={this.toggleSideBar}
          >
            <i className="fa fa-bars" />
          </a>

        </div>

        <SideBar user={this.props.user}
                 logout={this.logout} 
                 show={this.state.showSideBar}
                 close={this.closeSideBar}
        />

        {/* dropdown  */}
        {
          topics ?
            <div className={`w3-dropdown-content w3-light-grey ${drop}`} style={{fontFamily: 'Caveat', fontSize: '22px', padding: 0, width: '100%', zIndex: 999}}>
              {
                topics.map((topic,index) => (
                  <a key = {topic.id} href={`#${topic.id}`} className="w3-button w3-border-bottom" style={{width: '100%', textAlign: 'left'}} onClick={() => this.changeTopic(index)}> 
                    <div className="dropdown-container">
                      <div >
                        <div className="w3-text-blue"> Topic {topic.id} </div>
                        <div style={{whiteSpace: 'normal'}}> {topic.name} </div>
                      </div>
                      <div className="dropdown-check w3-text-green" style={{display: `${completion[index]?'block':'none'}`}}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </div>
                    </div>
                  </a>
                ))
              }
            </div>
            : null
        }
      </div>
    )
  }

  logout() {
    this.closeSideBar();
    this.props.logout();
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  toggleSideBar() {
    this.setState({
      showSideBar: !this.state.showSideBar
    })
  }

  closeSideBar() {
    this.setState({
      showSideBar: false
    })
  }

  changeTopic(index) {
    this.setState({ showDropdown : false });
    this.props.onChangeTopic && this.props.onChangeTopic(index);
  }

  getTopicCompletion() {
    const topics = this.props.topics;
    const progress = this.props.progress || {};

    if (!topics) {
      return null;
    }

    return topics.map((topic) => {
      let completed = true;
      topic.contents.forEach((content) => {
        if (!progress[topic.id] || !progress[topic.id][content.id]) {
          completed = false;
        }
      })
      return completed;
    })
  }

}

export default Header