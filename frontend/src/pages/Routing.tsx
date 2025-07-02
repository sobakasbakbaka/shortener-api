import { Routes, Route } from 'react-router-dom';
import { RedirectPage } from '@/pages/redirect';
import { HomePage } from '@/pages/home';

export const Routing = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/r/:alias" element={<RedirectPage />} />
  </Routes>
);
