import { Lock, Mail, MessageSquare } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthRightSide from '../components/AuthRightSide';
import { useAuth } from '../context/customHooks';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { authService } from '../services';
import Loader from '../components/Loader';

const SignInPage = () => {

  //* states
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: '', password: ''});
  const [isLogging, setIsLogging] = useState(false);

  //* custom hooks
  const { login } = useAuth();


  //* helper functions
  const validateForm = () => {

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('All fields are required');
      return false;

    }
    

    // if (formData.password.trim().length < 8) {
    //   toast.error('Password must be at least 8 characters long');
    //   return false;
    // }
    

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      toast.error('Invalid email address');
      return false;
    }
    
    
    return true;
  }


  //* handlers
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

      const isValid = validateForm();
    
      console.log('isValid:', isValid);
      if (!isValid) return;

      setIsLogging(true);

      const result = await authService.login(formData);

      if (result.success) {

        if (!result.data?.accessToken || !result.data?.user) 
          throw new Error('Invalid response from server');
        
        login({
          accessToken: result.data.accessToken,
          userData: result.data.user
        });

        navigate('/');

        toast.success('Logged in successfully');
      }
    } catch (error) {

      toast.error((error as Error).message ?? 'Error while logging in');

    } finally {
      setIsLogging(false);
    }
  
  }


  
  //* JSX
  return (
   <div className="min-h-screen grid lg:grid-cols-2">

      <div className="flex items-center justify-center flex-col gap-6 border">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex justify-center ">
            <span className=" bg-slate-400 p-2 rounded-lg">
            <MessageSquare size={32} strokeWidth={1.5}/>
            </span>
          </div>
          <p className="text-xl md:text-3xl font-bold">Sign In to your account</p>
          <p className="text-md sm:text-base text-center text-slate-500">Start chatting with your friends</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="input input-bordered flex items-center gap-2">
            <span><Mail /></span>
            <input 
              type="email" 
              className="grow" 
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <span><Lock /></span>
            <input 
              type="password" 
              className="grow" 
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </label>

          <button type="submit" className="w-full btn btn-primary" disabled={isLogging}>
            {isLogging ? (
              <>
                <Loader size={20}/>
                <span>Signing in...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>

        </form>

        <div className="flex items-center gap-2">
          <p className="text-slate-500">Don't have an account?</p>
          <Link to="/signUp" className="text-primary">Sign Up</Link>
        </div>

      </div>

      <AuthRightSide title="Sign In to your account" subTitle="Access your chats, your network, your world" />

    </div>
  )
}

export default SignInPage;