import React from 'react'
import { useMessageStore } from '../store/useMessageStore'
import { ChevronLeft } from 'lucide-react';

function ChatHeader() {
  const {setSelectedUser,selectedUser} = useMessageStore();
  const onlineUsers = [];
  return (
    <div className='p-2.5 border-b-2 border-base-300'>
    <div className=' w-full pr-5 flex items-center justify-between'>
      <div className='flex items-center gap-3' >
      <img src={selectedUser.ProfilePic || '/avatar.png'} alt='Profile Pic' className='size-16 rounded-full'></img>
      <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
      </div>
      <button className=' flex items-center justify-center bg-base-300 rounded-3xl' onClick={()=>setSelectedUser(null)}>
        <ChevronLeft className='size-7' />
      </button>
    </div>
  </div>
  )
}

export default ChatHeader