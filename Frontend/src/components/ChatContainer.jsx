import React, { useEffect, useRef } from 'react'
import { useMessage } from '../store/useMessage'
import { useAuth } from '../store/useAuth'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import MessageSkeleton from './MessageSkelotons'
import { formatMessageTime } from '../lib/timeFormat'

function ChatContainer() {
  const { getMessage, messages, selectedUser, isMessagesLoading } = useMessage()
  const { authUser } = useAuth()

  useEffect(() => {
    getMessage(selectedUser._id)
  }, [])

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto bg-gray-950">
        <ChatHeader />
        <MessageSkeleton />
        <ChatInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-950">
      <ChatHeader />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            <div className={`flex gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${message.senderId === authUser._id ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                  className="size-7 sm:size-8 rounded-full object-cover ring-2 ring-gray-800"
                />
              </div>

              {/* Message Content */}
              <div className="flex flex-col">
                {/* Timestamp */}
                <div className={`text-xs text-gray-500 mb-1 ${message.senderId === authUser._id ? "text-right" : "text-left"}`}>
                  {formatMessageTime(message.createdAt)}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 ${
                    message.senderId === authUser._id
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "bg-gray-800 text-gray-100"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[160px] sm:max-w-[200px] rounded-lg mb-2"
                    />
                  )}
                  {message.text && (
                    <p className="text-xs sm:text-sm break-words">{message.text}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChatInput />
    </div>
  )
}

export default ChatContainer