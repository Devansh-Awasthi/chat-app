import React from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

function UserChat() {
  return (
    <div>
      <ChatHeader/>
      <p>messages</p>
      <ChatInput/>
    </div>
  )
}

export default UserChat