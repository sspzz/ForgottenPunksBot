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
  gm: function (token, soul) {
    return `${process.env.FORGOTTENPUNKS_API}/api/${soul ? "souls/" : ""}img/gm/${token}`;
  },
  gif: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/random.gif`;
  },
  giff: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/framed/random.gif`;
  },
  say: function (token, phrase, soul) {
    return `${process.env.FORGOTTENPUNKS_API}/api/${soul ? "souls/" : ""}img/say?token=${token}&phrase=${encodeURIComponent(phrase)}`;
  },

  soulmeta: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/meta/${token}`
  },
  soul: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/souls/img/framed/${token}`;
  },

  circle: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/spells/img/0`;
  },

  spawn: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/spawn/img/framed/${token}`;
  },
  spawnMeta: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/spawn/meta/${token}`;
  },
  beast: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/beasts/img/framed/${token}`;
  },
  warrior: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/warriors/img/framed/${token}`;
  },
  warriorMeta: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/warriors/meta/${token}`;
  },

};
