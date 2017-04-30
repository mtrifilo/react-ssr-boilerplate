const User = require('../../db/models/User')
const { verifyUniqueUsername } = require('./verifyUniqueUsername')

function changeUsernameInDocument (id, newUsername) {
  return User.findOneAndUpdate(
    { _id: id },
    { $set: { username: newUsername } },
    { new: true }
  )
    .then(doc => {
      console.log('changeUsername.js: doc', doc)
      return { updated: true, doc }
    })
    .catch(err => {
      console.error('changeUsername.js:', err)
      return { updated: false, error: err }
    })
}

function changeUsername (id, newUsername) {
  return new Promise((resolve, reject) => {
    verifyUniqueUsername(newUsername)
      .then(result => {
        if (!result.isUnique) {
          return resolve({ error: result.error, status: 400 })
        }
        changeUsernameInDocument(id, newUsername)
          .then(result => {
            if (result.updated) {
              console.log('updated username!', result.doc)
              return resolve(result)
            }
            console.error('failed to update username:', result)
            return resolve({ error: result.error, status: 500 })
          })
          .catch(err => {
            console.error('failed to update username:', err)
            return reject(err)
          })
      })
      .catch(err => {
        console.error(
          'changeUsername.js: failed to verify unique username:',
          err
        )
        return reject(err)
      })
  })
}

module.exports = { changeUsername }
