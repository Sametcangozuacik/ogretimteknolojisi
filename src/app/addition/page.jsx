'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss';

const getRandomQuestion = (level) => {
  let min, max;
  if (level === 'easy') {
    min = 1; max = 9; // Tek basamaklı
  } else if (level === 'medium') {
    min = 10; max = 99; // İki basamaklı
  } else {
    min = 100; max = 9999; // Üç-dört basamaklı
  }

  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;
  return { a, b, result: a + b };
};

export default function Addition() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState(getRandomQuestion('medium'));
  const [userTime, setUserTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [passCount, setPassCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [level, setLevel] = useState('medium');

  const handleStart = () => {
    setScore(0);
    setPassCount(0);
    setCorrect(0);
    setIncorrect(0);
    setTimeLeft(userTime);
    setQuestion(getRandomQuestion(level));
    setIsRunning(true);
  };

  const handleSubmit = () => {
    const answer = Number(userAnswer.trim());
    if (isNaN(answer)) return;

    const isCorrect = answer === question.result;
    setFeedback(isCorrect ? '✅ Doğru!' : '❌ Yanlış!');
    setScore((s) => s + (isCorrect ? 1 : -1));
    isCorrect ? setCorrect((c) => c + 1) : setIncorrect((i) => i + 1);

    setTimeout(() => {
      setFeedback(null);
      setQuestion(getRandomQuestion(level));
    }, 800);

    setUserAnswer('');
  };

  const handlePass = () => {
    if (passCount < 2) {
      setPassCount((p) => p + 1);
      setUserAnswer('');
      setQuestion(getRandomQuestion(level));
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter' && isRunning) {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [userAnswer, isRunning]);

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>➕ Hızlı Toplama – Beyin ve Zaman Yarışı</h1>

      <div className={styles.timeScoreContainer}>
        <div className={styles.timeLeft}>Kalan Süre: {timeLeft} sn</div>
        <div className={styles.score}>Skor: {score}</div>
      </div>

      {!isRunning ? (
        <div className={styles.inputContainer}>
          <label>Süre:</label>
          <input
            type="number"
            min="10"
            max="300"
            value={userTime}
            onChange={(e) => setUserTime(+e.target.value)}
            className={styles.input}
          />
          <label>Zorluk:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="easy">Kolay (Tek Basamak)</option>
            <option value="medium">Orta (İki Basamak)</option>
            <option value="hard">Zor (3–4 Basamak)</option>
          </select>
          <button onClick={handleStart} className={styles.submitButton}>Başlat</button>
        </div>
      ) : timeLeft > 0 ? (
        <>
          <div className={styles.question}>
            {question.a} + {question.b} = ?
          </div>
          <div className={styles.inputContainer}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.submitButton}>Cevapla</button>
            <button onClick={handlePass} className={styles.submitButton} disabled={passCount >= 2}>Pas</button>
          </div>
          {feedback && <div className={styles.answerFeedback}>{feedback}</div>}
          <div className={styles.passStatus}>Pas Hakkı: {2 - passCount}</div>
        </>
      ) : (
        <div className={styles.gameOver}>
          ⏰ Süre Doldu! Skor: {score}
          <div className={styles.stats}>✅ {correct} | ❌ {incorrect}</div>
          <button onClick={() => setIsRunning(false)} className={styles.submitButton}>Tekrar Oyna</button>
        </div>
      )}
    </main>
  );
}
