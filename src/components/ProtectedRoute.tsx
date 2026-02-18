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
      <NavBar />
      <Outlet/>
    </>
  )
}

export default ProtectedRoute