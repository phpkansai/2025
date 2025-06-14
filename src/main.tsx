import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import ProposalCountdown from './pages/proposal_countdown';
import StickerCollection from './pages/sticker-collection';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/proposal_countdown" element={<ProposalCountdown />} />
        <Route path="/campaign/sticker-collection" element={<StickerCollection />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
