"use strict"

import React, { Component } from 'react'

import contentStyle from 'content-presenter/dist/css/content.css'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'

class ContentPlayer extends Component {
  constructor(props) {
    super(props);

    this.players = [
      YoutubePlayerReactPlugin
    ];
    
  }

  render() {
    return (
      <div>
        <ContentPresenter players = {this.players}
                          data = {this.props.data}
                          index = {this.props.contentIndex}
                          onLoadedContent = {() => console.log(`Content loaded: ${this.props.contentIndex}`)}
                          onFinishedContent = {() => this.onCompletedContent(this.props.contentIndex)}
                          onError = {err => console.log(err)}
        />
        
        <div className="w3-right w3-padding">
          <button className="w3-button" onClick={() => this.props.onChangedContent(this.props.contentIndex-1)}> Previous </button>
          <button className="w3-button" onClick={() => this.props.onChangedContent(this.props.contentIndex+1)}> Next </button>
        </div>
      </div>
    )
  }

  onCompletedContent(contentIndex) {
    this.props.onCompletedContent && this.props.onCompletedContent(contentIndex)
  }

}

export default ContentPlayer