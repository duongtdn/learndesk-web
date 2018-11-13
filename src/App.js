"use strict"

import React, { Component } from 'react'

import Header from './Header'
import ContentPlayer from './ContentPlayer'
import ContentList from './ContentList'

import { parseIDsFromHref } from './location-href'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { contentIndex : 0, topicIndex: 0, content: null };

    this.completeContent = this.completeContent.bind(this)

  }

  componentWillMount() {
    this._initContentAndIndex(this.props);
  }

  componentWillReceiveProps(props) {
    if (!this.props.user && props.user) {
      this._initContentAndIndex(props);
    }
  }

  _initContentAndIndex(props) {
    if (!props.data) {
      return
    }
    
    const {courseId, topicId} = parseIDsFromHref();

    /* find the index of topicId */
    const topics = props.data;
    let topicIndex = 0;
    const topic = topics.filter((topic, index) => {
      if (topic.id == topicId) { // a string vs a number
        topicIndex = index;
      }
    })

    const content = topics[topicIndex].contents[this.state.contentIndex];

    this.setState({ topicIndex, content });
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const topics = this.props.data;
    const topic = topics[this.state.topicIndex];
    const content = this.state.content;
    return (
      <div style = {{ display: this.props.display }} >
        <Header topics = {topics} 
                currentIndex = {this.state.topicIndex}
                onChangeTopic = {(index) => {this.changeTopic(index)}}
                progress = {this.props.progress}
                user = {this.props.user}
                logout={this.props.logout}
                onSelectLink={this.props.onSelectLink}
        />
        <div className="row">

          <div className="w3-threequarter w3-container">
            <ContentPlayer  content = {content}
                            moveToPreviousContent = {() => this.changeContent(this.state.contentIndex-1)}
                            moveToNextContent = {() => this.changeContent(this.state.contentIndex+1)}
                            onCompletedContent = {this.completeContent}
            />
            {
              content.materials ?
                <div>
                  <h3> Download Materials </h3>
                  <table className="w3-table">
                    <tbody>{
                      content.materials.map( (item, index) => (
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
                </div>
              : null
            }  
          </div>

          <div className="w3-quarter w3-container">
            <ContentList  data = {topic.contents} 
                          onChangedContent = {(contentIndex) => this.changeContent(contentIndex)}
                          progress = {this.props.progress[topic.id]}
                          currentIndex = {this.state.contentIndex}
            />
          </div>

        </div>
        
      </div>
    )
  }

  changeTopic(index) {
    const content = this.props.data[index].contents[0];
    this.setState({ topicIndex : index, contentIndex: 0, content })
  }

  changeContent(contentIndex, subIndex) {
    const topics = this.props.data;
    const contents = topics[this.state.topicIndex].contents;
    /* only change sub content */
    if (contentIndex === this.state.contentIndex) {  
      loadSubContent.apply(this)
    } else {
      loadOtherContent.apply(this)
    }

    function loadSubContent() {
      const currentContent = this.state.content; 
      if (currentContent.sub) {
        if (subIndex !== undefined || subIndex !== null) {
          subIndex = 0;
        }
        if (!currentContent.sub[subIndex]) {
          throw new Error("There's no sub content")
        }
        this.setState({ content: currentContent.sub[subIndex] });
        return
      }
    }

    function loadOtherContent() {
      if (contentIndex < 0) {
        const topicIndex = this.state.topicIndex - 1;
        if (topicIndex > -1) {
          contentIndex = 0;
          const content = this.props.data[topicIndex].contents[0];
          this.setState({ topicIndex, contentIndex, content });
          window.history.replaceState(null,null,`#${topics[topicIndex].id}`);
        }
        return
      }

      if (contentIndex < contents.length) {
        const topicIndex = this.state.topicIndex;
        const content = this.props.data[topicIndex].contents[contentIndex];
        this.setState({ contentIndex, content });
        return
      }
      
      /* last content, move to next topic if any */
      const topicIndex = this.state.topicIndex + 1;
      if (topicIndex < topics.length) {        
        contentIndex = 0;
        const content = this.props.data[topicIndex].contents[contentIndex];
        this.setState({ topicIndex, contentIndex, content });
        window.history.replaceState(null,null,`#${topics[topicIndex].id}`);
        return
      }  
    }

  }

  completeContent(contentId) {
    const topic = this.props.data[this.state.topicIndex];
    const topicId = topic.id;
    let  currentContent = this.state.content
    /* 
      content is completed when there's no sub content
    */
    if (currentContent.sub) {
      /* 
        currently, there's only one sub content. Hence specify subIndex 0 
        However, reserve for future, player can decide next sub content
      */
      this.changeContent(this.state.contentIndex, 0)
    } else {
      this.props.onCompletedContent && this.props.onCompletedContent({
        topicId,
        contentId
      });
      this.changeContent(this.state.contentIndex+1)
    }
   
  }

}

export default App;
