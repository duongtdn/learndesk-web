"use strict"

import React, { Component } from 'react'

import contentStyle from 'content-presenter/dist/css/content.css'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'
import { QuizPlayerReactPlugin } from 'quiz-player-plugin'

class ContentPlayer extends Component {
  constructor(props) {
    super(props);

    this.players = [
      YoutubePlayerReactPlugin,
      QuizPlayerReactPlugin
    ];
    
  }

  render() {
    return (
      <div>
        <ContentPresenter players = {this.players}
                          content = {this.props.content}
                          onLoadedContent = {() => console.log(`Content loaded: ${this.props.content.id}`)}
                          onFinishedContent = {() => this.onCompletedContent(this.props.content.id)}
                          onError = {err => console.log(err)}
        />
        
        <div className="w3-right w3-padding">
          <button className="w3-button" onClick={() => this.props.moveToPreviousContent()}> Previous </button>
          <button className="w3-button" onClick={() => this.props.moveToNextContent()}> Next </button>
        </div>
      </div>
    )
  }

  onCompletedContent(contentId) {
    this.props.onCompletedContent && this.props.onCompletedContent(contentId)
  }

}

export default ContentPlayer