"use strict"

import env from './env'

import React, { Component } from 'react'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'
import { QuizPlayerReactPlugin } from 'quiz-player-plugin'

QuizPlayerReactPlugin.setPlayerVars(env.quizPlayerVars)

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
        <div style={{ textAlign: 'right' }} >
          <div className="w3-padding" style={{position: 'relative', zIndex: 2}} >
            <button className="w3-button no-outline" onClick={() => this.props.moveToPreviousContent()}> Previous </button>
            <button className="w3-button no-outline" onClick={() => this.props.moveToNextContent()}> Next </button>
          </div>
        </div>       
      </div>
    )
  }
  onLoadedContent() {
    this.setState({ height : 'auto'})
    console.log(`Content loaded: ${this.props.content.id}`)
  }

  onResize(height) {
    // height = parseInt(height) + 10;
    this.setState({ height : height + 'px'})
  }

  onCompletedContent(contentId) {
    this.props.onCompletedContent && this.props.onCompletedContent(contentId)
  }

}

export default ContentPlayer