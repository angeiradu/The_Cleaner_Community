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
import Feedback from "./Pages/Feedback";
import HelpList from "./Pages/HelpList";
import FeedbackList from "./Pages/FeedbackList";
import Cleaner from "./Pages/Cleaner";
import Users from "./Pages/Users";
import EditCleaner from "./Pages/EditCleaner";
import EditUsers from "./Pages/EditUsers";
import BookCleaner from "./Pages/BookCleaner";
import BookList from "./Pages/BookList";
function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/cleaner" element={<Cleaner />} />
        <Route path="/users" element={<Users />} />
        <Route path="/editcleaner" element={<EditCleaner />} />
        <Route path="/editusers" element={<EditUsers />} />
        <Route path="/book" element={<BookCleaner />} />
        <Route path="/feedbackList" element={<FeedbackList />} />
        <Route path="/helpList" element={<HelpList />} />
      </Route>
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/help" element={<Help />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<BookList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  </BrowserRouter> 
  );
}

export default App;
