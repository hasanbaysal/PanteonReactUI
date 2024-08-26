import Login from "./components/Login";

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";

function App() {
  return (
   
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
