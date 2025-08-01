import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import LogInPage from "./pages/LogInPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useAuthStore } from "./store/userAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from "./store/useThemeStore.js";
function App() {
  const {theme} = useThemeStore();
  const { authUser, checkAuth, isCheckingAuth ,online} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log("online",{online});
  console.log({ authUser });
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    
    <div data-theme={theme}>
        <Toaster/>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogInPage /> : <Navigate to="/" />}
        />
        <Route path="/setting" element={<SettingPage />} />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
