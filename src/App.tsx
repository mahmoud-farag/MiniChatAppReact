import { Route, Routes } from "react-router-dom"
import { HomePage, ProfilePage, SettingsPage, SignInPage, SignUpPage } from "./pages/index"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
  <>

    <Routes>
      <Route path="/sign-in" element={<SignInPage/>} />
      <Route path="/sign-up" element={<SignUpPage/>} />

      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<HomePage/>} />
        <Route path="/settings" element={<SettingsPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Route>

      
    </Routes>
  </>
  )
}

export default App
