import { useEffect, useState } from 'react';
import CardDamageCalculator from './CardDamageCalculator';

export default function App() {
  const [kidMode, setKidMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('kid-mode', kidMode);
  }, [kidMode]);

  return <CardDamageCalculator kidMode={kidMode} setKidMode={setKidMode} />;
}
