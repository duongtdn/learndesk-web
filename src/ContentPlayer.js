"use strict"

import React, { Component } from 'react'

import contentStyle from 'content-presenter/dist/css/content.css'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'

import ProgressBar from './ProgressBar'


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
                          onContentLoaded = {() => console.log(`Content loaded: ${this.props.contentIndex}`)}
                          onContentFinished = {() => console.log(`Content finished: ${this.props.contentIndex}`)}
                          onError = {err => console.log(err)}
        />
        
        <div className="w3-right w3-padding">
          <button className="w3-button" onClick={() => this.props.onContentChange(this.props.contentIndex-1)}> Previous </button>
          <button className="w3-button" onClick={() => this.props.onContentChange(this.props.contentIndex+1)}> Next </button>
        </div>
      </div>
    )
  }

}

export default ContentPlayer