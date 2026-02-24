import { Link } from 'react-router-dom';
import { MessageSquare, Settings, User, LogOut } from 'lucide-react';
import { useAuth, } from '../context/customHooks';

const NavBar = () => {
  const { logout } = useAuth();

  return (
    <header className='bg-base-100 border-b border-base-300 fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-[2000px] mx-auto  h-16 flex items-center'>

        {/* Logo */}
        <div className='w-full'>
          <Link to='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
          <div className='bg-primary/10 p-1.5 rounded-lg'>
            <MessageSquare className='text-primary' size={22} strokeWidth={1.5} />
          </div>
          <span className='font-semibold text-base'>Chat App</span>
        </Link>
        </div>

        {/* Nav Links */}
        <nav className='flex items-center gap-1'>

          <Link to='/settings' className='btn btn-ghost btn-sm gap-2'>
            <Settings size={22} strokeWidth={2.5} />
            <span className='hidden sm:inline'>Settings</span>
          </Link>

          <Link to='/profile' className='btn btn-ghost btn-sm gap-2'>
            <User size={22} strokeWidth={2.5} />
            <span className='hidden sm:inline'>Profile</span>
          </Link>

          <button onClick={logout} className='btn btn-ghost btn-sm gap-2'>
            <LogOut size={22} strokeWidth={2.5} />
            <span className='hidden sm:inline'>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;