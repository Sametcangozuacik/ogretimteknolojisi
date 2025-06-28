'use client';
import React, { useState, useEffect } from 'react';

const getRandomEquation = (level) => {
  let rangeA = 9, rangeX = 20, rangeB = 20;
  if (level === 'easy') {
    rangeA = 5;
    rangeX = 10;
    rangeB = 10;
  } else if (level === 'hard') {
    rangeA = 15;
    rangeX = 40;
    rangeB = 40;
  }
  const a = Math.floor(Math.random() * rangeA) + 1; // a: 1..rangeA
  const x = Math.floor(Math.random() * (rangeX * 2 + 1)) - rangeX; // x: -rangeX..rangeX
  const b = Math.floor(Math.random() * (rangeB * 2 + 1)) - rangeB; // b: -rangeB..rangeB
  const c = a * x + b;

  return { a, b, c, solution: x };
};

export default function OneDegreeEquationGame() {
  const [level, setLevel] = useState('medium');
  const [userTime, setUserTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(userTime);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(getRandomEquation(level));
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  const startGame = () => {
    setScore(0);
    setCorrect(0);
    setIncorrect(0);
    setTimeLeft(userTime);
    setQuestion(getRandomEquation(level));
    setUserAnswer('');
    setFeedback(null);
    setIsRunning(true);
  };

  const handleSubmit = () => {
    if (!isRunning) return;
    const answer = Number(userAnswer.trim());
    if (isNaN(answer)) return;

    if (answer === question.solution) {
      setFeedback('✅ Doğru!');
      setScore((s) => s + 1);
      setCorrect((c) => c + 1);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${question.solution}`);
      setScore((s) => (s > 0 ? s - 1 : 0));
      setIncorrect((i) => i + 1);
    }

    setTimeout(() => {
      setQuestion(getRandomEquation(level));
      setUserAnswer('');
      setFeedback(null);
    }, 1500);
  };

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      setIsRunning(false);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  const bDisplay = question.b >= 0 ? `+ ${question.b}` : `- ${Math.abs(question.b)}`;

  return (
    <main style={{
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      maxWidth: 450,
      margin: 'auto',
      textAlign: 'center',
      border: '2px solid #ccc',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h1>1. Dereceden Denklem Çözme Oyunu</h1>

      {!isRunning ? (
        <>
          <div style={{ margin: '1rem 0' }}>
            <label style={{ marginRight: '0.5rem' }}>Süre (sn):</label>
            <input
              type="number"
              min={10}
              max={300}
              value={userTime}
              onChange={(e) => setUserTime(Math.min(300, Math.max(10, Number(e.target.value))))}
              style={{ width: 80, padding: '0.2rem 0.4rem', fontSize: '1rem' }}
            />
          </div>

          <div style={{ margin: '1rem 0' }}>
            <label style={{ marginRight: '0.5rem' }}>Zorluk:</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} style={{ fontSize: '1rem' }}>
              <option value="easy">Kolay</option>
              <option value="medium">Orta</option>
              <option value="hard">Zor</option>
            </select>
          </div>

          <button
            onClick={startGame}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1.2rem',
              backgroundColor: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Başlat
          </button>
        </>
      ) : (
        <>
          <div style={{ fontSize: '1.7rem', margin: '1.5rem 0' }}>
            {question.a}x {bDisplay} = {question.c}
          </div>

          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="x'in değerini gir"
            style={{ fontSize: '1.3rem', padding: '0.5rem', width: '80%' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <br />
          <button
            onClick={handleSubmit}
            style={{
              marginTop: '1rem',
              padding: '0.6rem 1.2rem',
              fontSize: '1.2rem',
              cursor: 'pointer',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#2196f3',
              color: 'white'
            }}
          >
            Cevapla
          </button>

          <div style={{ marginTop: '1rem', fontSize: '1.3rem' }}>{feedback}</div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-around', fontSize: '1.2rem' }}>
            <div>⏰ Kalan Süre: {timeLeft} sn</div>
            <div>⭐ Skor: {score}</div>
            <div>✅ {correct} | ❌ {incorrect}</div>
          </div>
        </>
      )}
    </main>
  );
}
