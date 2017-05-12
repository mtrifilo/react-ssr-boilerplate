import React from 'react'
import { func } from 'prop-types'

const DeleteAccountModal = ({ onClickDeleteAccount }) => {
  return (
    <div
      className='modal fade'
      id='deleteAccountModal'
      tabIndex='-1'
      role='dialog'
      aria-labelledby='deleteAccount'
      aria-hidden='true'
    >
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='deleteAccount'>Delete Account</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
            >
              <span aria-hidden='true'>×</span>
            </button>
          </div>
          <div className='modal-body'>
            Are you sure you wish to delete your account? This cannot be undone.
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
            >
              Go Back
            </button>
            <button
              type='button'
              className='btn btn-danger'
              data-dismiss='modal'
              onClick={onClickDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

DeleteAccountModal.propTypes = {
  onClickDeleteAccount: func
}

export default DeleteAccountModal
