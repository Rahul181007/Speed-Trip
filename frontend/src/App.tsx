import { useEffect } from "react"
import AppRoutes from "./app/routes/AppRoutes"
import { initializeAuth } from "./features/auth/services/initializeAuth"

function App() {

  useEffect(()=>{
    initializeAuth()
  },[])

  return <AppRoutes/>
}

export default App
