import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Home from "./pages/home/home";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/authContext";
import { useBackendConnection } from "./context/backendConnectionContext";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { authUser } = useAuthContext();
  const { isConnected, isChecking, error } = useBackendConnection();

  // Show loading screen while checking backend connection
  if (isChecking || !isConnected) {
    const message = error
      ? "Waking up backend server..."
      : "Connecting to server...";
    return <LoadingScreen message={message} />;
  }

  return (
    <div className="p-2 sm:p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
