import * as React from 'react';
import { createRoot } from 'react-dom/client';
import KakaoMap from './view/kakaoMap';

const App = () => {
  return (
    <>
      <KakaoMap />
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
