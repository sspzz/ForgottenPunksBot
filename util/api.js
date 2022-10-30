require("dotenv").config();

module.exports = {
  meta: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/meta/${token}`
  },
  punk: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/framed/${token}`;
  },
  punknoframe: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/${token}`;
  },
  gm: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/gm/${token}`;
  },
  gif: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/random.gif`;
  },
  giff: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/framed/random.gif`;
  },
  say: function (token, phrase) {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/say?token=${token}&phrase=${encodeURIComponent(phrase)}`;
  },

  soulmeta: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/meta/${token}`
  },
  soul: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/img/framed/${token}`;
  },
  soulgm: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/img/gm/${token}`;
  },
  soulgif: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/img/random.gif`;
  },
  soulgiff: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/img/framed/random.gif`;
  },

  circle: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/spells/img/0`;
  },

};
