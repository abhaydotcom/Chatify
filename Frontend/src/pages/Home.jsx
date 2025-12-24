import React from 'react'
import { useMessage } from '../store/useMessage'
import NoChatSelected from '../components/NoChatSelected'
import ChatContainer from '../components/ChatContainer'
import Sidebar from '../components/Sidebar'

const Home = () => {
  const { selectedUser } = useMessage()

  return (
    <div className="h-screen bg-gray-950">
      <div className="flex items-center justify-center pt-16 sm:pt-20 px-2 sm:px-4">
        <div className="bg-gray-900 rounded-lg sm:rounded-xl shadow-2xl w-full max-w-6xl h-[calc(100vh-4.5rem)] sm:h-[calc(100vh-5rem)] md:h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg sm:rounded-xl overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home