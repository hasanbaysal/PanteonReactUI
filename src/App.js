import Login from "./components/Login";

import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import SignupPage from "./components/SignupPage";

function App() {
  return (
   
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
