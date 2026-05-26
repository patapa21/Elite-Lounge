import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import EliteLounge from './elite-lounge.jsx';
import EliteAdmin from './elite-lounge-admin.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<EliteLounge />} />
      <Route path="/admin" element={<EliteAdmin />} />
    </Routes>
  </HashRouter>
);
