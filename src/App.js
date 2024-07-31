// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageLayout from './Components/PageLayout';
import Dashboard from './Pages/Dashboard';
import NotFound from './Pages/404';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Pages/Profile';
import Scheduling from './Pages/Scheduling';
import Payment from './Pages/Payment';
import Help from './Pages/Help';
import Feedback from './Pages/Feedback';
import HelpList from './Pages/HelpList';
import FeedbackList from './Pages/FeedbackList';
import Cleaner from './Pages/Cleaner';
import Users from './Pages/Users';
import EditCleaner from './Pages/EditCleaner';
import EditUsers from './Pages/EditUsers';
import BookCleaner from './Pages/BookCleaner';
import BookList from './Pages/BookList';
import AdminRoute from './AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/scheduling" element={<AdminRoute element={Scheduling} />} />
          <Route path="/cleaner" element={<AdminRoute element={Cleaner} />} />
          <Route path="/users" element={<AdminRoute element={Users} />} />
          <Route path="/editcleaner" element={<AdminRoute element={EditCleaner} />} />
          <Route path="/editusers" element={<AdminRoute element={EditUsers} />} />
          <Route path="/book" element={<AdminRoute element={BookCleaner} />} />
          <Route path="/feedbackList" element={<AdminRoute element={FeedbackList} />} />
          <Route path="/helpList" element={<AdminRoute element={HelpList} />} />
          <Route path="/dashboard" element={<AdminRoute element={Dashboard} />} />
        </Route>
        <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/bookingList" element={<BookList />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
