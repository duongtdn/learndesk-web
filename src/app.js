"use strict"

import React, { Component } from 'react'

import style from './css/app.css'
import w3 from './css/w3.css'

import Header from './Header'
import ContentPlayer from './ContentPlayer'
import ContentList from './ContentList'

import { parseIDsFromHref } from './location-href'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { contentIndex : 0, topicIndex: 0 };

    this.completeContent = this.completeContent.bind(this)

  }

  componentWillMount() {
    const {courseId, topicId} = parseIDsFromHref();
    /* find the index of topicId */
    const topics = this.props.data;
    let topicIndex = 0;
    const topic = topics.filter((topic, index) => {
      if (topic.id == topicId) { // a string vs a number
        topicIndex = index;
      }
    })

    this.setState({ topicIndex });

  }

  render() {
    const topics = this.props.data;
    const topic = topics[this.state.topicIndex];
    const content = topic.contents[this.state.contentIndex];
    return (
      <div>
        <Header topics = {topics} 
                currentIndex = {this.state.topicIndex}
                onChangeTopic = {(index) => {this.changeTopic(index)}}
                progress = {this.props.progress}
        />

        <div className="row">

          <div className="w3-threequarter w3-container">
            <ContentPlayer  content = {content}
                            moveToPreviousContent = {() => this.changeContent(this.state.contentIndex-1)}
                            moveToNextContent = {() => this.changeContent(this.state.contentIndex+1)}
                            onCompletedContent = {this.completeContent}
            />
          </div>

          <div className="w3-quarter w3-container">
            <ContentList  data = {topic.contents} 
                          onChangedContent = {(contentIndex) => this.changeContent(contentIndex)}
                          progress = {this.props.progress[topic.id]}
            />
          </div>

        </div>
        
      </div>
    )
  }

  changeTopic(index) {
    this.setState({ topicIndex : index, contentIndex: 0 })
  }

  changeContent(contentIndex) {
    const topics = this.props.data;
    const contents = topics[this.state.topicIndex].contents;

    if (contentIndex < 0) {
      const topicIndex = this.state.topicIndex - 1;
      if (topicIndex > -1) {
        contentIndex = 0;
        this.setState({ topicIndex, contentIndex });
        window.history.replaceState(null,null,`#${topics[topicIndex].id}`);
      }
      return
    }

    if (contentIndex < contents.length) {
      this.setState({contentIndex});
      return
    }
    
    /* last content, move to next topic if any */
    const topicIndex = this.state.topicIndex + 1;
    if (topicIndex < topics.length) {
      contentIndex = 0;
      this.setState({ topicIndex, contentIndex });
      window.history.replaceState(null,null,`#${topics[topicIndex].id}`);
      return
    }  
  }

  completeContent(contentId) {
    const topicId = this.props.data[this.state.topicIndex].id;
    this.props.onCompletedContent && this.props.onCompletedContent({
      topicId,
      contentId
    });
    this.changeContent(this.state.contentIndex+1)
  }

}

export default App;
