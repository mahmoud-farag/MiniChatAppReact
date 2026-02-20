import NavBar from './NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/customHooks'



export const ProtectedRoute = () => {
  
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated:', isAuthenticated)
  if (!isAuthenticated)
    return <Navigate to="/signIn" replace />;

  return (
    <>
      <NavBar/>
      <div className='pt-20 px-4'>
        <Outlet/>
      </div>
    </>
  )
}

export default ProtectedRoute