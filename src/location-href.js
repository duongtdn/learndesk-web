"use strict"

export function parseIDsFromHref() {
  const href = window.location.href;

  if (/^(http:\/\/|https:\/\/).*\/course\/.*#.*$/.test(href)) { // validate href
    const splitted = href.split('#');
    const topicId = splitted[1];   
    const url = splitted[0].split("/");
    const courseId = url[url.length-1];
    return { topicId, courseId }
  }

  if (/^(http:\/\/|https:\/\/).*\/course\/.*$/.test(href)) { // validate href
    const url = href.split("/");
    const courseId = url[url.length-1];
    return { topicId: null, courseId }
  }

  return { topicId: null, courseId:null }
  
}

export function setLocationHref(url) {
  window.location.href = url
}