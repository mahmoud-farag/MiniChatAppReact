import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface IUser {
  id: number;
  name: string;
};

const HomePage = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Wilson' },
    { id: 4, name: 'hany'},
    { id: 5, name: 'mohamed'},
    { id: 6, name: 'ali'},
    { id: 7, name: 'omar'},
    { id: 8, name: 'yasser'},
    { id: 9, name: 'saad'},
    { id: 10, name: 'mostafa'},
    { id: 11, name: 'ahmed'},
    { id: 12, name: 'kareem'},
    { id: 13, name: 'hassan'},
    { id: 14, name: 'mohamed'},
    { id: 15, name: 'ali'},
    { id: 16, name: 'omar'},
    { id: 17, name: 'yasser'},
    { id: 18, name: 'saad'},
    { id: 19, name: 'mostafa'},
    { id: 20, name: 'ahmed'},
    { id: 21, name: 'kareem'},
    { id: 22, name: 'hassan'},
    { id: 23, name: 'kareem'}
  ])

  return (
    <div className='h-screen overflow-hidden'>
      <div className='flex h-full relative'>
        
        {/* Users sidebar */}
        <div className={`absolute inset-y-0 left-0 lg:relative w-full lg:w-auto lg:flex-[2] border transition-transform duration-300 ease-in-out ${showChat ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'} z-20 lg:z-auto overflow-y-auto`}>
          {users.map((user) => (
            <button
              key={user.id} 
              className='border-b w-full p-4 flex items-center gap-2 hover:bg-slate-200'
              onClick={() => setShowChat(true)}
            >
              <p className='text-lg font-semibold'>{user.name}</p>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className={`bg-slate-100 absolute inset-0 lg:relative lg:flex-[8] border p-2 transition-transform duration-300 ease-in-out ${showChat ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} flex flex-col`}>
          <span className='absolute top-1 left-1 size-6 bg-slate-500 flex items-center justify-center rounded-full'>
            <ArrowLeft size={22} onClick={() => setShowChat(false)} className='lg:hidden cursor-pointer text-white'/>
          </span>
          <div className='flex-1 text-slate-400'>
            chat area
          </div>
        </div>
         
      </div>
    </div>
  );
};

export default HomePage;