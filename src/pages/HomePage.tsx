import { useState } from 'react';
import ChatHeader from '../components/chat/ChatHeader';
import ChatBody from '../components/chat/ChatBody';
import ChatInput from '../components/chat/ChatInput';
import type { IUser } from '../libs/interfaces';

const HomePage = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [users] = useState<IUser[]>([
    {
      id: '1',
      email: 'john@example.com',
      fullName: 'John Doe',
      password: 'hashed_password',
      avatarS3FileName: null,
      avatarS3Folder: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      email: 'jane@example.com',
      fullName: 'Jane Smith',
      password: 'hashed_password',
      avatarS3FileName: null,
      avatarS3Folder: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      email: 'bob@example.com',
      fullName: 'Bob Wilson',
      password: 'hashed_password',
      avatarS3FileName: null,
      avatarS3Folder: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      email: 'alice@example.com',
      fullName: 'Alice Johnson',
      password: 'hashed_password',
      avatarS3FileName: null,
      avatarS3Folder: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  return (
    <div className='h-screen overflow-hidden'>
      <div className='flex h-full relative'>
        
        {/* Users sidebar */}
        <div className={`absolute inset-y-0 left-0 lg:relative w-full lg:w-auto lg:flex-[2] border-r border-base-300 transition-transform duration-300 ease-in-out ${showChat ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'} z-20 lg:z-auto overflow-y-auto bg-base-100`}>
          {users.map((user) => (
            <button
              key={user.id} 
              className={`border-b border-base-300 w-full p-4 flex items-center gap-3 transition-colors ${selectedUser?.id === user.id ? 'bg-base-200' : 'hover:bg-base-200'}`}
              onClick={() => {
                setSelectedUser(user);
                setShowChat(true);
              }}
            >
              <div className={`avatar shrink-0 ${user.avatarS3FileName ? '' : 'placeholder'}`}>
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary">
                  {user.avatarS3FileName ? (
                    <img src={user.avatarS3FileName} alt={user.fullName} className="object-cover" />
                  ) : (
                    <span className="text-lg font-semibold">{user.fullName.charAt(0).toUpperCase()}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <p className='font-semibold truncate w-full text-left'>{user.fullName}</p>
                <p className='text-xs text-base-content/60'>Active now</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className={`bg-base-200 absolute inset-0 lg:relative lg:flex-[8] transition-transform duration-300 ease-in-out ${showChat ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} flex flex-col z-30 lg:z-auto`}>
          {selectedUser ? (
            <>
              <ChatHeader user={selectedUser} onClose={() => setShowChat(false)} />
              <ChatBody user={selectedUser} />
              <ChatInput />
            </>
          ) : (
            <div className='hidden lg:flex flex-1 items-center justify-center text-base-content/50 text-lg flex-col gap-3'>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                {/* Message icon placeholder */}
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
              </div>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
         
      </div>
    </div>
  );
};

export default HomePage;