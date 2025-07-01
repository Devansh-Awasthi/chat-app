import React from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'

function UserChat() {
  return (
    <div className='flex overflow-auto flex-col flex-1'>
      <ChatHeader/>
      <p>messages</p>
      <ChatInput/>
    </div>
  )
}

export default UserChat