"use strict"

import React, { Component } from 'react'

import contentStyle from 'content-presenter/dist/css/content.css'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'
import { QuizPlayerReactPlugin } from 'quiz-player-plugin'

class ContentPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 'auto'
    }

    this.players = [
      YoutubePlayerReactPlugin,
      QuizPlayerReactPlugin
    ];
    
    ['onLoadedContent', 'onCompletedContent', 'onResize']
    .forEach(method => this[method] = this[method].bind(this));

  }

  render() {
    return (
      <div style={{height: this.state.height}} >
        <ContentPresenter players = {this.players}
                          content = {this.props.content}
                          onLoadedContent = {this.onLoadedContent}
                          onFinishedContent = {() => this.onCompletedContent(this.props.content.id)}
                          onError = {err => console.log(err)}
                          onResize = {this.onResize}
        />
        
        <div className="w3-right w3-padding">
          <button className="w3-button" onClick={() => this.props.moveToPreviousContent()}> Previous </button>
          <button className="w3-button" onClick={() => this.props.moveToNextContent()}> Next </button>
        </div>
      </div>
    )
  }
  onLoadedContent() {
    this.setState({ height : 'auto'})
    console.log(`Content loaded: ${this.props.content.id}`)
  }

  onResize(height) {
    height = parseInt(height) + 80;
    this.setState({ height : height + 'px'})
  }

  onCompletedContent(contentId) {
    this.props.onCompletedContent && this.props.onCompletedContent(contentId)
  }

}

export default ContentPlayer