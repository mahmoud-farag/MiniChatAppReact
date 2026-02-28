import { Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthRightSide from '../components/AuthRightSide';
import { useState } from 'react';
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { authService } from '../services';
import { useAuth } from '../context/react-context/customHooks';

interface IFormData {
  email: string;
  fullName: string;
  password: string;
};

const SignUpPage = (): React.ReactNode => {
  //* States
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    fullName: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  //* custom Hooks
  const { login } = useAuth();

  //* helper functions
  const validateFormData = () => {


    if(!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim())  {
      toast.error('All fields are required');
      return false;
    }
    

    if (formData.password.trim().length < 8) {
      toast.error('Password must be at least 8 characters long');
      return false;
    }
    

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      toast.error('Invalid email address');
      return false;
    }
    
    
    return true;

  }

  //* life cycle hooks

  //* handlers
  const handleFormSubmission = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try { 

      setIsSubmitting(true);

       const isValid = validateFormData();

       if (!isValid)
        return;

      const result = await authService.register(formData);

      if (result?.success) {

        if (!result?.data?.accessToken || !result?.data?.user) {
          throw new Error('Invalid response from server');
        }

        login({accessToken: result.data.accessToken, userData: result.data.user});

        navigate('/');

        toast.success(result?.message ?? 'Account created successfully');
      }

    } catch(error) {

      toast.error((error as Error).message ?? 'Error while creating new Account');

    } finally {
      setIsSubmitting(false);
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
          <p className="text-xl md:text-3xl font-bold">Create Account</p>
          <p className="text-md sm:text-base text-center text-slate-500">Get started now</p>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmission} className="space-y-6">
          <label className="input input-bordered flex items-center gap-2">
            <span><Mail /></span>
            <input 
              onChange={(e) => setFormData((prev) => ({...prev, email: e.target.value}))}
              type="email" 
              className="grow" 
              placeholder="Email" />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <span><User /></span>
            <input 
              onChange={(e) => setFormData((prev) => ({...prev, fullName: e.target.value}))}
              type="text" 
              className="grow" 
              placeholder="User Name" />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <span><Lock /></span>
            <input 
              onChange={(e) => setFormData((prev) => ({...prev, password: e.target.value}))}
              type="password" 
              className="grow" 
              placeholder="Password" />
          </label>

          <button  type="submit" className="w-full btn btn-primary">
            {isSubmitting ? 
              <>
                <Loader size={32} className="text-slate-300" />
                <span>Creating account...</span>
              </>
            : 'Create account'}
            </button>

        </form>

        <div className="flex items-center gap-2">
          <p className="text-slate-500">Already have an account?</p>
          <Link to="/signIn" className="text-primary">Sign In</Link>
        </div>

      </div>


      <AuthRightSide title="Create Account" subTitle="Join the conversation. Your network starts here." />


    </div>
  )
}

export default SignUpPage;