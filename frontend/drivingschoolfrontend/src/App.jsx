import React from 'react';
import LandingPage from './Pages/LandingPage';
import Login from './Components/Login/Login';
import CustomerDashboard from './Components/Customer/CustomerDashboard';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from "./Components/Admin/routes/layout.jsx";
import DashboardPage from "./Components/Admin/routes/dashboard/page.jsx";
import Calendar from "./Components/Admin/calendar/calendar.jsx";
import Customer from "./Components/Admin/customer/customer.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ToastContainer />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> Create Register component */}

          {/* Protected Routes */}
          <Route path="/customer/dashboard" element={
            <ProtectedRoute>
              <CustomerDashboard />
            </ProtectedRoute>
          } />

          <Route path="/staff/dashboard" element={
            <ProtectedRoute>
              <Layout /> {/* Replace AdminPage with Layout directly */}
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="analytics" element={<h1 className="title">Analytics</h1>} />
            <Route path="customers" element={<Customer />} />
            <Route path="new-customer" element={<h1 className="title">New Customer</h1>} />
            <Route path="verified-customers" element={<h1 className="title">Verified Customers</h1>} />
            <Route path="products" element={<h1 className="title">Products</h1>} />
            <Route path="inventory" element={<h1 className="title">Inventory</h1>} />
            <Route path="settings" element={<h1 className="title">Setting</h1>} />
            <Route path="analytics/calendar" element={<Calendar />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;