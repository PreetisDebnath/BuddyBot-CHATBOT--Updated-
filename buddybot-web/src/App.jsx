import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import ResourcesPage from './pages/ResourcesPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Fallback for feature cards that link to routes not yet implemented */}
        <Route path="/mood_tracker" element={<div className="p-4">Mood Tracker Coming Soon</div>} />
        <Route path="/community" element={<div className="p-4">Community Coming Soon</div>} />
        <Route path="/counsellor" element={<div className="p-4">Counsellor Contact Info Coming Soon</div>} />
        <Route path="/journal" element={<div className="p-4">Journal Coming Soon</div>} />
      </Routes>
    </Router>
  );
}

export default App;
