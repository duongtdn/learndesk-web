"use strict"

const ep = {
  login: 'http://localhost:3100/auth/login',
  content: 'http://localhost:3301/content/:courseId',
  progress: 'http://localhost:3302'
}

const ln = {
  enroll: 'https://www.google.com',
  account: '',
  resetPassword: '',
  dafaultMalePic: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
}

const quizPlayerVars = {
  apiSrc: 'http://localhost:3800/quiz/quiz_api.js',
  iframeSrc: 'http://localhost:3800/quiz/index.html',
  origin: 'http://localhost:3800'
}

export default {
  ep,
  ln,
  quizPlayerVars
}
