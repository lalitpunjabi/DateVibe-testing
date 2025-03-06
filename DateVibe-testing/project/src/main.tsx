// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => (
  <h1>Hello, React + Vite + TypeScript! 🚀</h1>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
