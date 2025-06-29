import React from 'react'
import { useMessageStore } from '../store/useMessageStore'
import UserChat from '../components/UserChat';
import NoChat from '../components/NoChat';
import Sidebar from '../components/Sidebar';

function Home() {
  const {selectedUser} = useMessageStore();
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center pt-20 px-4 justify-center'>
      <div className='bg-base-100 shadow-xl rounded-lg max-w-6xl w-full h-[calc(100vh-6rem)]'>
        <div className='flex h-full rounded-lg overflow-hidden'>
          <Sidebar/>
          {!selectedUser ? <NoChat/> : <UserChat/>}
        </div>
      </div>

      </div>

    </div>
  )
}

export default Home