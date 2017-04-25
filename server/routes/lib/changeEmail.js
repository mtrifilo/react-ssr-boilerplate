const User = require('../../db/models/User')

function changeUsername (id, newEmail) {
  return User.findOneAndUpdate(
    {_id: id},
    {$set: {email: newEmail}}
  )
  .then(doc => {
    return {updated: true, doc}
  })
  .catch(err => {
    console.error('changeEmail.js:', err)
    return {updated: false, error: err}
  })
}

module.exports = {changeUsername}
