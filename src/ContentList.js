"use strict"

import React, { Component } from 'react'

class ContentList extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const contentList = this.props.data || [];
    const progress = this.props.progress || [];
    return (
      <div >
        <h3 className="w3-white" > Contents </h3>
        <div className="hr" />
        <div style={{overflow: 'hidden'}}>
        {
          contentList.map( (content, index) => {
            const zIndex = 100 - content.id; 
            return (
              <div  className="w3-cell-row w3-hover-pale-blue" 
                    style={{width:'100%', cursor: 'pointer'}} 
                    key={content.id}
                    onClick={() => this.changeContent(index)} >
                <div className="w3-cell w3-cell-middle" style={{width:'40px'}}>
                  <div className={`circle ${progress[index]? 'completed':''}`} style={{ zIndex }}/>
                </div>

                <div className="w3-container w3-cell">
                  <p> {content.name} </p>
                </div>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }

  changeContent(index) {
    this.props.onContentChange && this.props.onContentChange(index);
  }
}

export default ContentList