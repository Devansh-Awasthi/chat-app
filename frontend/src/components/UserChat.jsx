import React from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import { useMessageStore } from '../store/useMessageStore'
import MessageSkeleton from './skeleton/MessageSkeleton';

function UserChat() {
  const{getMessage,messages,isMessageLoading,selectedUser} = useMessageStore();
  
  if(isMessageLoading){
    return(
       <div className='flex overflow-auto flex-col flex-1'>
      <ChatHeader/>
      <MessageSkeleton/>
      <ChatInput/>
    </div>
    )
  }
  return (
    <div className='flex overflow-auto flex-col flex-1'>
      <ChatHeader/>
      <p>messages</p>
      <ChatInput/>
    </div>
  )
}

export default UserChat