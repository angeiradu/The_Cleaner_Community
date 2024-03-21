import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from './Components/PageLayout';
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/404";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
