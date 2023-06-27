import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoMap from './view/kakaoMap';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KakaoMap />} />
      </Routes>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Router />);
} else {
  console.error('Root element not found');
}
