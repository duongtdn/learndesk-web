"use strict"

import React, { Component } from 'react'

import Header from './Header'

class Whiteboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showDetailProgress: false,
      showMaterials: {}
    }
  } 

  render() {
    if (!this.props.data) {
      return null;
    }
    if (!this.props.user) {
      return null;
    }
    const user = this.props.user
    return (
      <div style = {{ display: this.props.display }} >
        <Header user = {this.props.user}
                logout={this.props.logout}
                onSelectLink={this.props.onSelectLink}
        />
        <div className = "w3-container">
          <h2 style={{marginTop: '16px'}}> 
            <img src={user.profile.picture}
                 className="w3-image w3-round " 
                 width={60} height={60}
                 alt="user picture" />
            <span className="w3-margin"> {user.profile.displayName || user.profile.userName} </span> 
          </h2>
          
          <hr />

          <h3 className="w3-text-blue"> Study Progress </h3>
          
          <p className="w3-text-blue-grey" style={{fontWeight: 'bold'}}>
            Completion: {this._calculateTotalCompletion()} <br />
            <button className="w3-button w3-small no-outline" onClick={() => this.setState({ showDetailProgress: ~this.state.showDetailProgress })}> 
              {this.state.showDetailProgress ? <span> Hide detail </span> : <span> Show detail </span>}
              <i className={`fa ${this.state.showDetailProgress? 'fa-caret-up' : 'fa-caret-down'}`} /> 
            </button>
          </p>

          {
            this.state.showDetailProgress ?
              this.props.data.map(topic => {
                const completion = this._calculateTopicCompletion(topic)
                return (
                  <div className="w3-cell-row w3-border-bottom" key={topic.id} style={{margin: '8px 0px', padding: '8px 0px'}}>
                    <div className="w3-container w3-cell w3-mobile">
                      <span className="w3-small w3-text-grey" > Topic {topic.id} </span> <br />
                      <span className="w3-text-blue-grey" > {topic.title} </span>
                    </div>
                    <div className="w3-container w3-cell w3-cell-middle w3-mobile" style={{width: '50%'}}>
                      <div className="w3-pale-green">
                        <div className="w3-container w3-green w3-center" style={{height: '24px', width: completion}}> {completion} </div>
                      </div>
                    </div>
                  </div>
                )
              })
            : null
          }

          <hr />

          <h3 className="w3-text-blue"> Course Materials </h3>
          
          {
            this.props.data.map(topic => {
              const contents = topic.contents
              const materials = [];
              contents.forEach(content => {
                if (content.materials) {
                 materials.push(...content.materials)
                }
              })
              if (materials.length > 0) {
                return (
                  <div key={topic.id} className="w3-container" >
                    <h4 className=""> Topic {topic.id}: {topic.title} </h4>
                    <button className="w3-button w3-small no-outline" onClick={() => this.toggleShowMaterials(topic.id)}> 
                      {this.state.showMaterials[topic.id] ? <span> Hide detail </span> : <span> Show detail </span>}
                      <i className={`fa ${this.state.showMaterials[topic.id]? 'fa-caret-up' : 'fa-caret-down'}`} /> 
                    </button>
                    {
                      this.state.showMaterials[topic.id] ?
                        <table className="w3-table">
                          <tbody>{
                            materials.map( (item, index) => (
                              <tr key={index} className="w3-text-blue">
                                <td>
                                  {item.name} <br />
                                  <span className="w3-text-grey w3-small" style={{fontStyle: 'italic'}}> {item.category} </span>
                                </td>
                                <td>
                                  {
                                    item.type === "download" ?
                                      <a href={item.url} style={{textDecoration: 'none'}}> <i className="fa fa-download" /> <span className="w3-hide-small"> Download </span> </a>
                                    :
                                      <a href={item.url} style={{textDecoration: 'none'}}> <i className="fa fa-external-link" /> <span className="w3-hide-small"> Link </span> </a>
                                  }           
                                </td>
                              </tr>
                            ))
                          }</tbody>
                        </table>
                      : null
                    }
                  </div>
                )
              } else {
                return null
              }
             
            })
          }

        </div>
      </div>
    )
  }

  toggleShowMaterials(topicId) {
    const showMaterials = {...this.state.showMaterials};
    if (showMaterials[topicId]) {
      showMaterials[topicId] = false
    } else {
      showMaterials[topicId] = true
    }
    this.setState({ showMaterials })
  }

  _calculateTopicCompletion(topic) {
    const progress = this.props.progress
    if (progress[topic.id]) {
      const max = topic.contents.length
      const p = progress[topic.id]
      const completed = Object.keys(p).filter(k => p[k]).length
      return `${Math.round((completed/max)*100)}%`
    } else {
      return '0%'
    }
  }

  _calculateTotalCompletion() {
    const progress = this.props.progress
    const topics = this.props.data
    let max = 0
    let completed = 0
    topics.forEach(topic => {
      max += topic.contents.length
      if (progress[topic.id]) {
        const p = progress[topic.id]
        completed += Object.keys(p).filter(k => p[k]).length
      }
    })
    if (max) {
      return `${Math.round((completed/max)*100)}%` 
    } else {
      return 'Error'
    }
  }

}

module.exports = Whiteboard