const User = require('../../db/models/User')
const {verifyUniqueEmail} = require('./verifyUniqueEmail')

function changeEmailInDocument (id, newEmail) {
  return User.findOneAndUpdate(
    {_id: id},
    {$set: {email: newEmail}},
    {new: true}
  )
  .then(doc => {
    return {updated: true, doc}
  })
  .catch(err => {
    console.error('changeEmail.js:', err)
    return {updated: false, error: err}
  })
}

function changeEmail (id, newEmail) {
  return new Promise((resolve, reject) => {
    verifyUniqueEmail(newEmail)
      .then(result => {
        if (!result.isUnique) {
          return resolve({error: result.error, status: 400})
        }
        changeEmailInDocument(id, newEmail)
          .then(result => {
            if (result.updated) {
              console.log('updated email!', result.doc)
              return resolve(result)
            }
            console.error('failed to update email:', result)
            return resolve({error: result.error, status: 500})
          })
          .catch(err => {
            console.error('failed to update email:', err)
            return reject(err)
          })
      })
      .catch(err => {
        console.error('changeEmail.js: failed to verify unique email', err)
        return reject(err)
      })
  })
}

module.exports = {changeEmail}
