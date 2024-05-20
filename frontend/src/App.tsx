import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/Layout';
import HomePage from './pages/Home.page';
import FindTripPage from './pages/FindTrip.page';
import CreateTripPage from './pages/CreateTrip.page';
import LoginPage from './pages/Login.page';
import RegisterPage from './pages/Register.page';
import AccountPage from './pages/Account.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/trips" element={<FindTripPage />} />
          <Route path="/trips/create" element={<CreateTripPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
