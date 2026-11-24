import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PlannerPage from './pages/PlannerPage';
import ItineraryPage from './pages/ItineraryPage';
import MyTripsPage from './pages/MyTripsPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="itinerary" element={<ItineraryPage />} />
        <Route path="itinerary/:id" element={<ItineraryPage />} />
        <Route path="my-trips" element={<MyTripsPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
