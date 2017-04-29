const User = require('../../db/models/User')
const {verifyUniqueEmail} = require('./verifyUniqueEmail')
const {verifyUniqueUsername} = require('./verifyUniqueUsername')

function changeUsernameAndEmailInDocument (id, newUsername, newEmail) {
  return User.findOneAndUpdate(
    {_id: id},
    {$set: {email: newEmail, username: newUsername}},
    {new: true}
  )
    .then(doc => {
      return {updated: true, doc}
    })
    .catch(err => {
      console.error('changeUsernameAndEmail.js:', err)
      return {updated: false, error: err}
    })
}

function changeUsernameAndEmail (id, newUsername, newEmail) {
  return new Promise((resolve, reject) => {
    verifyUniqueEmail(newEmail)
      .then(result => {
        if (!result.isUnique) {
          return resolve({error: result.error, status: 400})
        }
        return verifyUniqueUsername(newUsername)
      })
      .then(result => {
        if (!result.isUnique) {
          return resolve({error: result.error, status: 400})
        }
        return changeUsernameAndEmailInDocument(id, newUsername, newEmail)
      })
      .then(result => {
        if (result.updated) {
          console.log('updated username and email!', result.doc)
          return resolve(result)
        }
        console.error('failed to update username and email:', result)
        return resolve({error: result.error, status: 500})
      })
      .catch(err => {
        console.error(
          'changeUsernameAndEmail.js: failed to update username and email',
          err
        )
        return reject(err)
      })
  })
}

module.exports = {changeUsernameAndEmail}
