import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import { useMessageStore } from '../store/useMessageStore'
import MessageSkeleton from './skeleton/MessageSkeleton';
import { useAuthStore } from '../store/userAuthStore';
import { formatMessageTime } from '../constants/timeFormat';

function UserChat() {
  const{getMessage,messages,isMessageLoading,selectedUser} = useMessageStore();
  const{authUser} = useAuthStore();
 useEffect(()=>{
    getMessage(selectedUser._id);
 },[getMessage,selectedUser]) 
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
     <div className='overscroll-y-auto flex-1 space-y-4 p-4'>
      {messages.map((message)=>(
        <div key={message._id}
        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} >
          <div className='chat-image avatar'>
          <div className='size-10 rounded-full'>
            <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}/>
          </div>
          </div>
          <div className='chat-header'>
            <time className='opacity-40 text-xs ml-1'>
              {formatMessageTime(message.createdAt)}
            </time>
          </div>
          <div className='chat-bubble flex flex-col'>
            {message.image && 
            <img src={message.image || "/avatar.png"} 
            className='sm:max-w-[200px] rounded-md'
            alt="image text" />
            
            }
            {
              message.text && 
              <p >
                {message.text}
              </p>
            }
          </div>
        </div>
      ))}
     </div>
      <ChatInput/>
    </div>
  )
}

export default UserChat