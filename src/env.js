"use strict"

const ep = {
  login: 'https://auth.expiup.com/auth/login',
  content: 'https://api.study.expiup.com/content',
  progress: 'https://api.study.expiup.com/progress'
}

const ln = {
  enroll: 'https://www.expiup.com/me/enrolled',
  account: '',
  resetPasswordLink: 'https://auth.expiup.com/auth/request_reset_password_link',
  dafaultMalePic: 'https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100'
}

const quizPlayerVars = {
  apiSrc: 'https://embed.quiz.expiup.com/api.bundle.js',
  iframeSrc: 'https://embed.quiz.expiup.com/',
  origin: 'https://embed.quiz.expiup.com'
}

export default {
  ep,
  ln,
  quizPlayerVars
}
