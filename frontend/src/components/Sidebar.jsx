import React, { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";

function Sidebar() {
  const { getUser, users, selectedUser, setSelectedUser, isUsersLoading } =
    useMessageStore();
  let online = [];
  useEffect(() => {
  getUser();
  }, [getUser]);

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* {online user filter} */}
      </div>
      <div className="w-full py-2.5 overflow-y-auto">
        {users.map((user) => {
          return <button className={`w-full pt-2 pb-2 transition-colors flex items-center  hover:bg-base-300 ${selectedUser===user._id ? "bg-base-300 ring ring-base-300":""}`} 
          key={user._id} 
          onClick={()=>setSelectedUser(user)}
          > 
          <div className="relative mx-auto lg:mx-0">
            <img className="size-16 object-contain rounded-full" src={user.profilePic || '/avatar.png'} alt="profile"  />
             {online.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
          </div>
           <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
              <div className="text-sm text-zinc-400">
                {online.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>;
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
