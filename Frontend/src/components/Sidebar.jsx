import React, { useEffect, useState } from 'react'
import { useMessage } from '../store/useMessage'
import { useAuth } from '../store/useAuth'
import SidebarSkeleton from './SidebarSkeletons';
import { Users } from 'lucide-react';

const Sidebar = () => {
  const { getUser, setSelectedUser, selectedUser, users, isUsersLoading } = useMessage();
  const { onlineUsers } = useAuth();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUser();
  }, [getUser])

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-72 bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="border-b border-gray-800 w-full p-4 lg:p-5">
        <div className="flex items-center gap-2 lg:gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
            <Users className="size-5 lg:size-6 text-white" />
          </div>
          <span className="font-semibold text-white text-lg hidden lg:block">Contacts</span>
        </div>

        {/* Online Filter */}
        <div className="mt-4 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Show online only
            </span>
          </label>
          <span className="text-xs text-gray-500 ml-auto">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 flex-1">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 lg:p-3.5 flex items-center gap-3
              hover:bg-gray-800 transition-all duration-200
              border-l-4 transition-colors
              ${selectedUser?._id === user._id 
                ? "bg-gray-800 border-l-purple-500" 
                : "border-l-transparent"
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0 flex-shrink-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-11 lg:size-12 object-cover rounded-full ring-2 ring-gray-700"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-gray-900 animate-pulse" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-white truncate text-sm">
                {user.fullName}
              </div>
              <div className={`text-xs flex items-center gap-1.5 mt-0.5 ${
                onlineUsers.includes(user._id) ? "text-green-400" : "text-gray-500"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  onlineUsers.includes(user._id) ? "bg-green-400" : "bg-gray-500"
                }`}></span>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-gray-500 py-8 px-4">
            <Users className="size-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No online users</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar