const User = require('../../db/models/User')

function changeUsername (id, newUsername) {
  return User.findOneAndUpdate(
    {_id: id},
    {$set: {username: newUsername}}
  )
  .then(doc => {
    return {updated: true, doc}
  })
  .catch(err => {
    console.error('changeUsername.js:', err)
    return {updated: false, error: err}
  })
}

module.exports = {changeUsername}
