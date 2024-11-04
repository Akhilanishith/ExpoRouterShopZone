import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './screens/Dashboard/Dashboard';
import SellerVerificationPage from './screens/SellerVerificationPage/SellerVerificationPage';
import Users from './screens/Users/Users';
import Orders from './screens/Orders/Orders';
import Carts from './screens/Carts/Carts';
import PendingSellersPage from './screens/Sellers/PendingSellersPage';
import VerifiedSellersPage from './screens/Sellers/VerifiedSellersPage';
import AllSellersPage from './screens/Sellers/AllSellersPage';
import ShopScreen from './screens/categorysection/Category';
import AdminBrandUpload from './screens/Brands/AdminBrandUpload';
import LoginPage from './screens/Users/Login.jsx';
import { useAuth } from './context/authContext';
import SubcategoryScreen from './screens/categorysection/SubcategoryScreen';
import SellerBrandVerification from './screens/Brands/sellerCrtBrandVerifiyByAdmin.jsx';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" replace />;
  }

  return children;
}

function App() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a proper loading component
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/LoginPage" />}
        />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SellerVerificationPage"
          element={
            <ProtectedRoute>
              <SellerVerificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carts"
          element={
            <ProtectedRoute>
              <Carts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellers/allsellers"
          element={
            <ProtectedRoute>
              <AllSellersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellers/pending"
          element={
            <ProtectedRoute>
              <PendingSellersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sellers/verified"
          element={
            <ProtectedRoute>
              <VerifiedSellersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Category"
          element={
            <ProtectedRoute>
              <ShopScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ShopScreenSubcategory/:categoryId"
          element={
            <ProtectedRoute>
              <SubcategoryScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminbrand"
          element={
            <ProtectedRoute>
              <AdminBrandUpload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SellerBrandVerification"
          element={
            <ProtectedRoute>
              <SellerBrandVerification />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;