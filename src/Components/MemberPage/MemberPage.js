/* eslint-disable react/no-unused-prop-types */
import React /*, {Component} */ from 'react'
import Authorize from '../Common/Authorize'
import MemberContent from './MemberContent'

const MemberPage = props => (
  <Authorize>
    <MemberContent />
  </Authorize>
)

export default MemberPage
