import React from 'react'
import { useAuthStore } from '../store/userAuthStore'
import { Camera } from 'lucide-react';

function ProfilePage() {
  const {authUser,updateprofile,isUpdatingProfile} = useAuthStore();
  const handelProfileUpdate=(e)=>{
e.preventDefault();
  }
  return (
    <div className='h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8'>
      <div className='bg-base-300 rounded-xl p-6 space-y-8 flex-col  justify-items-center'>
        <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-3'>Your Profile Information</p>
        </div>
        <div className='size-36 rounded-full bg-amber-100 relative'>
         <img 
         src={authUser.profilePic || '/avatar.png'}
         className='object-cover '></img>
          <label className={`absolute  rounded-full right-0 bottom-0 bg-base-content cursor-pointer ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
            <Camera className='h-5 w-5 m-2 text-base-200'></Camera>
            <input
            type='file'
            className='hidden bg-base-300'
            accept='image/*'
            onChange={handelProfileUpdate}
            disabled={isUpdatingProfile}></input>
          </label>
        </div>
         <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
      </div>

      </div>

    </div>
  )
}

export default ProfilePage