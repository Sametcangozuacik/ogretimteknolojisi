'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss'; // SCSS dosyan varsa

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
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  // Yeni oyun başladığında question da set edilir
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
    if (!isRunning || !question) return;
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

  // Güvenli şekilde bDisplay
  const bDisplay = question
    ? question.b >= 0
      ? `+ ${question.b}`
      : `- ${Math.abs(question.b)}`
    : '';

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>1. Dereceden Denklem Çözme Oyunu</h1>

      {!isRunning ? (
        <>
          <div className={styles.inputContainer}>
            <label>Süre (sn):</label>
            <input
              type="number"
              min={10}
              max={300}
              value={userTime}
              onChange={(e) =>
                setUserTime(Math.min(300, Math.max(10, Number(e.target.value))))
              }
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <label>Zorluk:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className={styles.input}
            >
              <option value="easy">Kolay</option>
              <option value="medium">Orta</option>
              <option value="hard">Zor</option>
            </select>
          </div>

          <button onClick={startGame} className={styles.submitButton}>
            Başlat
          </button>
        </>
      ) : (
        <>
          {question ? (
            <div className={styles.question}>
              {question.a}x {bDisplay} = {question.c}
            </div>
          ) : (
            <div>Yükleniyor...</div>
          )}

          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="x'in değerini gir"
            className={styles.input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button onClick={handleSubmit} className={styles.submitButton}>
            Cevapla
          </button>

          {feedback && <div className={styles.answerFeedback}>{feedback}</div>}

          <div className={styles.statusBar}>
            <span>⏰ Kalan Süre: {timeLeft} sn</span>
            <span>⭐ Skor: {score}</span>
            <span>✅ {correct} | ❌ {incorrect}</span>
          </div>
        </>
      )}
    </main>
  );
}
