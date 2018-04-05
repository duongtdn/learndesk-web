"use strict"

import React, { Component } from 'react'
import { render } from 'react-dom'

import { ContentPresenter } from 'content-presenter'
import { YoutubePlayerReactPlugin } from 'youtube-player-plugin'

import style from './css/app.css'

class APP extends Component {
  constructor(props) {
    super(props);

    this.state = { index : 0};

    this.players = [
      YoutubePlayerReactPlugin
    ];

  }

  render() {
    const data = [
      {_id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE'},
      {_id: 1, player: 'YOUTUBE', src: 'r6bkETisayg'},
    ]
    return (
      <div>
        <div>
          <button onClick={() => this.setState({index : this.state.index-1})}> Back </button>
          <button onClick={() => this.setState({index : this.state.index+1})}> Next </button>
        </div>
        <ContentPresenter players = {this.players}
                          data = {data}
                          index = {this.state.index}
                          onContentLoaded = {() => console.log(`Content loaded: ${this.state.index}`)}
                          onContentFinished = {() => console.log(`Content finished: ${this.state.index}`)}
                          onError = {err => console.log(err)}
                          />
      </div>
    )
  }
}

render(<APP />, document.getElementById('root'));