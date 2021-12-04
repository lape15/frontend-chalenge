import React, { useEffect } from 'react';
import './App.css';
import WalletPage from './wallet';
import users from './util';

function App() {
  useEffect(() => {
    if (!localStorage.users) localStorage.setItem('users', JSON.stringify(users));
  }, []);

  return (
    <div className="App">
      <WalletPage />
    </div>
  );
}

export default App;
