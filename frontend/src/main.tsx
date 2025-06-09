import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PerfilLoader from './PerfilLoader';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PerfilLoader />
  </StrictMode>
);