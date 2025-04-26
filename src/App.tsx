import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIWaveLanding from './components/AIWave_Landing/AIWaveLanding';
import TalentApply from './components/talent_apply/TalentApply';
import CompanyPost from './components/Company_post/CompanyPost';

import './App.css';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AIWaveLanding />} />
          <Route path="/apply" element={<TalentApply />} />
          <Route path="/hire" element={<CompanyPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;