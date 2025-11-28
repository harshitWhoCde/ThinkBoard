import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home.jsx';
import CreatePage from '../pages/CreatePage.jsx';
import NopteDetail from '../pages/NopteDetail.jsx';

const App = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🌌 Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-neutral-950 
        bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]">
      </div>

      {/* 🌿 Your App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NopteDetail />} />
      </Routes>

    </div>
  );
};

export default App;
