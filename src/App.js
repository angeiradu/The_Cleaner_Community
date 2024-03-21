import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageLayout from './Components/PageLayout';
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/404";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Scheduling from "./Pages/Scheduling";
import Payment from "./Pages/Payment";
import Help from "./Pages/Help";
import Geolocation from "./Pages/Geolocation";
import Feedback from "./Pages/Feedback";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/help" element={<Help />} />
        <Route path="/geolocation" element={<Geolocation />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
