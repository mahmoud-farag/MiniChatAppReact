import { Route, Routes } from 'react-router-dom'
import { HomePage, ProfilePage, SettingsPage, SignInPage, SignUpPage, NotFoundPage } from './pages/index'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
  <>

    <Routes>
      <Route path="/signIn" element={<SignInPage/>} />
      <Route path="/signUp" element={<SignUpPage/>} />

      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Route>

      

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
  )
}

export default App
