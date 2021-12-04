import { useEffect } from 'react';
import './App.css';
import WalletPage from './wallet';
import.meta.env.VITE_API_CREDENTIALS;
import users from './util';

function App() {
  useEffect(() => {
    if (!localStorage.users) localStorage.setItem('users', JSON.stringify(users));
    return () => localStorage.clear();
  }, []);

  return (
    <div className="App">
      <WalletPage />
    </div>
  );
}

export default App;
