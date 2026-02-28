import NavBar from './NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/react-context/customHooks'



export const ProtectedRoute = () => {
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated)
    return <Navigate to="/signIn" replace />;

  return (
    <>
      <NavBar/>
      <div className='pt-[78px] px-1'>
        <Outlet/>
      </div>
    </>
  )
}

export default ProtectedRoute