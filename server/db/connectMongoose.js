const mongoose = require('mongoose')
mongoose.Promise = global.Promise

/**
 * Connects mongoose to a MongoDB instance
 *
 * @param {string} uri
 */
const connectMongoose = uri => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log('mongoose: connected!')
    })
    .catch(err => {
      console.error('mongoose connection failed:', err)
    })
}

module.exports = connectMongoose
