import { useState } from 'react';
import './App.css';
import WalletPage from './wallet';
import.meta.env.VITE_API_CREDENTIALS;

function App() {
  return (
    <div className="App">
      <WalletPage />
    </div>
  );
}

export default App;
