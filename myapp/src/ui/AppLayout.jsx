import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto px-4 py-8 min-h-[100vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
