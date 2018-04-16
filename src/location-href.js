"use strict"

export function parseIDsFromHref() {
  const href = window.location.href;

  if (/^(http:\/\/|https:\/\/).*\/study\/.*#.*$/.test(href)) { // validate href
    const splitted = href.split('#');
    const topicId = splitted[1];
    const url = splitted[0].split("/");
    const courseId = url[url.length-1];
    return { topicId, courseId }
  } else {
    return { topicId: null, courseId:null }
  }
  
}