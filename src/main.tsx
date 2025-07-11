import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import NonHomeLayout from './components/NonHomeLayout';
import App from './App.tsx';
import ProposalCountdown from './pages/proposal_countdown';
import StickerCollection from './pages/sticker-collection';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/proposal_countdown" element={<NonHomeLayout><ProposalCountdown /></NonHomeLayout>} />
        <Route path="/campaign/sticker-collection" element={<NonHomeLayout><StickerCollection /></NonHomeLayout>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
