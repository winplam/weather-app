import React from 'react'

export default function Message (props) {
  if (props.showLoader) {
    return (
      <div className="message">{props.message}
        <div className="loader"></div>
      </div>
    )
  } else {
    return (
      <div className="message">{props.message}</div>
    )
  }
}