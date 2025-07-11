'use client';
import React, { useState, useEffect } from 'react';

const checks = {
  2: (num) => num % 2 === 0,
  3: (num) => {
    const sum = num.toString().split('').reduce((a, b) => a + +b, 0);
    return sum % 3 === 0;
  },
  4: (num) => {
    const lastTwo = Number(num.toString().slice(-2));
    return lastTwo % 4 === 0;
  },
  5: (num) => {
    const lastDigit = Number(num.toString().slice(-1));
    return lastDigit === 0 || lastDigit === 5;
  },
  8: (num) => {
    const lastThree = Number(num.toString().slice(-3));
    return lastThree % 8 === 0;
  },
  9: (num) => {
    const sum = num.toString().split('').reduce((a, b) => a + +b, 0);
    return sum % 9 === 0;
  }
};

const divisors = [2, 3, 4, 5, 8, 9];

const getRandomNumber = () => {
  // 100 - 9999 arası rastgele sayı (3-4 basamaklı)
  return Math.floor(Math.random() * (9999 - 100 + 1)) + 100;
};

export default function DivisibilityGame() {
  const [number, setNumber] = useState(getRandomNumber());
  const [currentDivisor, setCurrentDivisor] = useState(divisors[0]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswer, setUserAnswer] = useState('');
  const [index, setIndex] = useState(0);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setNumber(getRandomNumber());
    setIndex(0);
    setCurrentDivisor(divisors[0]);
    setUserAnswer('');
    setFeedback(null);
    setIsRunning(true);
  };

  const handleAnswer = (answer) => {
    if (!isRunning) return;
    const correct = checks[currentDivisor](number);
    const userSaysYes = answer.toLowerCase() === 'evet';

    if (userSaysYes === correct) {
      setScore((s) => s + 1);
      setFeedback('✅ Doğru!');
    } else {
      setScore((s) => (s > 0 ? s - 1 : 0));
      setFeedback(`❌ Yanlış! ${number} sayısı ${currentDivisor}'ye ${correct ? '' : 'bölünmez'} bölünür.`);
    }

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= divisors.length) {
        // Yeni sayı ve başa dön
        setNumber(getRandomNumber());
        setIndex(0);
        setCurrentDivisor(divisors[0]);
      } else {
        setIndex(i => i + 1);
        setCurrentDivisor(divisors[index + 1]);
      }
    }, 1200);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      setFeedback('⏰ Süre doldu!');
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  return (
    <main style={{
      maxWidth: 460,
      margin: '2rem auto',
      padding: '2rem',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      border: '2px solid #2196f3',
      borderRadius: '14px',
      textAlign: 'center',
      background: '#e3f2fd',
      boxShadow: '0 0 12px rgba(33,150,243,0.3)'
    }}>
      <h1 style={{ color: '#1565c0' }}>🔢 Bölünebilme Kuralları Oyunu</h1>

      {!isRunning ? (
        <button
          onClick={startGame}
          style={{
            padding: '0.6rem 1.4rem',
            fontSize: '1.2rem',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 5px 12px rgba(33,150,243,0.6)'
          }}
        >
          Başlat
        </button>
      ) : (
        <>
          <div style={{ fontSize: '2rem', margin: '1.5rem 0', color: '#1565c0' }}>
            {number} sayısı {currentDivisor}'ye bölünebilir mi?
          </div>

          <div>
            <button
              onClick={() => handleAnswer('evet')}
              style={{
                margin: '0 0.5rem',
                padding: '0.6rem 1.5rem',
                fontSize: '1.2rem',
                backgroundColor: '#4caf50',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(76,175,80,0.6)'
              }}
            >
              Evet
            </button>

            <button
              onClick={() => handleAnswer('hayır')}
              style={{
                margin: '0 0.5rem',
                padding: '0.6rem 1.5rem',
                fontSize: '1.2rem',
                backgroundColor: '#f44336',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(244,67,54,0.6)'
              }}
            >
              Hayır
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', fontSize: '1.4rem', minHeight: 40 }}>
            {feedback}
          </div>

          <div style={{ marginTop: '2rem', fontSize: '1.2rem', color: '#1565c0' }}>
            Skor: {score} | Kalan Süre: {timeLeft} sn
          </div>
        </>
      )}
    </main>
  );
}
