import React from 'react';
import LandingPage from './components/LandingPage.tsx';
import Quiz from './components/Quiz.tsx';
import { Route, Routes } from 'react-router-dom';
import Result from './components/Result.tsx';

// route path to quiz
const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result score={0} />} />
      </Routes>
    </div>
  );
};


export default App;
