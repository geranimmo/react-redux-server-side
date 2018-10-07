require('@babel/register')({
    presets: [
        ["@babel/preset-env", {
            "targets": {
              "node": "current",
              "browsers": ["last 2 versions", "IE 11"]
             }
          }],
          "@babel/preset-react"
    ]
});

module.exports = require('./server/index.js');