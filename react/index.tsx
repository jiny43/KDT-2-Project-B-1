import * as React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  return <h1>Hello World Project-B-1-Team</h1>;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found');
}
