import { Link } from 'react-router-dom';
import { MessageSquareOff } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-base-100 text-center space-y-6 p-4'>
        <div className='bg-base-200 p-6 rounded-full'>
            <MessageSquareOff size={64} className='text-primary' />
        </div>
        <h1 className='text-4xl font-bold'>404</h1>
        <p className='text-xl text-base-content/70'>Oops! The page you are looking for does not exist.</p>
        <Link to='/' className='btn btn-primary'>
            Go back home
        </Link>
    </div>
  )
}

export default NotFoundPage;
