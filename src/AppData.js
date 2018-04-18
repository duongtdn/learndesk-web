"use strict"

import React, { Component } from 'react'

import App from './App'

import { parseIDsFromHref } from './location-href'

const progress = {}

const data = [
  {
    id: 1, 
    name: 'Topic 1 is the first topic, id define topic number',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE', name: 'Nick and Dave Conversation'},
      {id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', name: 'How to make friend and infulence people'},
    ]
  },
  {
    id: 2, 
    name: 'The second one, whatever name can be used',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'X6a9odk6b_c', name: 'Games of Thrones theme song: piano cover '},
      {id: 1, player: 'YOUTUBE', src: 'XQMnT9baoi8', name: 'Dragonborn is comming: piano cover'},
      {id: 3, player: 'YOUTUBE', src: 'dUNm721wTec', name: 'Age of agression'},
    ]
  },
  {
    id: 3, 
    name: 'Name should not too long',
    contents: [
      {id: 0, player: 'YOUTUBE', src: 'R9ZE97rnBqE', name: 'Nick and Dave Conversation'},
      {id: 1, player: 'YOUTUBE', src: 'r6bkETisayg', name: 'The last storyline'},
    ]
  }
]

class AppData extends Component {
  constructor(props) {
    super(props);
    this.state = { data, progress }
    this.updateProgress = this.updateProgress.bind(this);
  }

  componentWillMount() {
    console.log(parseIDsFromHref());
  }

  render() {
    return (
      <App  data = {this.state.data}
            progress = {this.state.progress}
            onCompletedContent = {this.updateProgress}
      />
    )
  }

  updateProgress({topicId, contentId}) {
    if (!progress[topicId]) {
      progress[topicId] = {};
    }
    progress[topicId][contentId] = true;
    this.setState({ progress })
  }
}

export default AppData
