"use strict"

const ep = {
  login: 'https://auth.expiup.com/auth/login',
  content: 'https://api.study.expiup.com/content',
  progress: 'https://api.study.expiup.com/progress'
}

const ln = {
  enroll: 'https://www.expiup.com/me/enrolled',
  account: '',
  resetPassword: '',
  dafaultMalePic: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
}

const quizPlayerVars = {
  apiSrc: 'https://s3-ap-southeast-1.amazonaws.com/quiz.expiup.com/api.bundle.js',
  iframeSrc: 'http://quiz.expiup.com.s3-website-ap-southeast-1.amazonaws.com',
  origin: 'http://quiz.expiup.com.s3-website-ap-southeast-1.amazonaws.com'
}

export default {
  ep,
  ln,
  quizPlayerVars
}
