import { useState } from 'react';
import './App.css';
import WalletPage from './wallet';

function App() {
  const [count, setCount] = useState(680);

  return (
    <div className="App">
      <WalletPage />
    </div>
  );
}

export default App;
