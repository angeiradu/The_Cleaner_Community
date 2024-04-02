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
import Cleaner from "./Pages/Cleaner";
import Users from "./Pages/Users";
import Feedback from "./Pages/Feedback";
import EditCleaner from "./Pages/EditCleaner";
import EditUsers from "./Pages/EditUsers";
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
        <Route path="/cleaner" element={<Cleaner />} />
        <Route path="/users" element={<Users />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/editcleaner" element={<EditCleaner />} />
        <Route path="/editusers" element={<EditUsers />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
