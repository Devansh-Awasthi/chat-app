import React from 'react'
import { useMessageStore } from '../store/useMessageStore';
import SidebarSkeleton from './skeleton/SidebarSkeleton';

function Sidebar() {
    const { getUser, users, selectedUser, setSelectedUser, isUsersLoading } = useMessageStore();
  let  online = [];
  return (
    <div>
        <SidebarSkeleton></SidebarSkeleton>
    </div>
  )
}

export default Sidebar