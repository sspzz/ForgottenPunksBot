require("dotenv").config();

module.exports = {
  punk: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/framed/${token}`;
  },
  gm: function (token) {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/gm/${token}`;
  },
  gif: function () {
    return `${process.env.FORGOTTENPUNKS_API}/api/img/random.gif`;
  },
};
