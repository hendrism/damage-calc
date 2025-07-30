import { useEffect, useState } from 'react';
import CardDamageCalculator from './CardDamageCalculator';

export default function App() {
  const [kidMode, setKidMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('kid-mode', kidMode);
  }, [kidMode]);

  return (
    <div>
      <button
        onClick={() => setKidMode(!kidMode)}
        className="fixed top-4 right-4 bg-white/80 text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-white"
      >
        {kidMode ? 'Adult Mode' : 'Kid Mode'}
      </button>
      <CardDamageCalculator />
    </div>
  );
}
