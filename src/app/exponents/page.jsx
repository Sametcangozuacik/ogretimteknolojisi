'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss';

// Zorluk seviyesine göre taban ve üs üretir
const getRandomQuestion = (level) => {
  let baseRange, exponentRange;

  if (level === 'easy') {
    baseRange = 5;      // taban 2-5 arası
    exponentRange = 2;  // üs 1-2 arası
  } else if (level === 'medium') {
    baseRange = 10;     // taban 2-10 arası
    exponentRange = 3;  // üs 1-3 arası
  } else {
    baseRange = 15;     // taban 2-15 arası
    exponentRange = 4;  // üs 1-4 arası
  }

  const base = Math.floor(Math.random() * (baseRange - 1)) + 2;
  const exponent = Math.floor(Math.random() * exponentRange) + 1;

  return { base, exponent };
};

export default function ExponentGame() {
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
    setFeedback(null);
    setUserAnswer('');
  };

  const handleSubmit = () => {
    const answer = Number(userAnswer.trim());
    if (isNaN(answer)) return;

    const correctAnswer = Math.pow(question.base, question.exponent);
    const isCorrect = answer === correctAnswer;

    setFeedback(isCorrect ? '✅ Doğru!' : `❌ Yanlış! Doğru cevap: ${correctAnswer}`);
    setScore((s) => s + (isCorrect ? 1 : -1));
    isCorrect ? setCorrect((c) => c + 1) : setIncorrect((i) => i + 1);

    // Hızlı soru geçişi: yeni soruyu hemen göster, geri bildirimi 1 sn sonra kaldır
    setQuestion(getRandomQuestion(level));
    setUserAnswer('');
    setTimeout(() => setFeedback(null), 1000);
  };

  const handlePass = () => {
    if (passCount < 2) {
      setPassCount((p) => p + 1);
      setUserAnswer('');
      setQuestion(getRandomQuestion(level));
      setFeedback(null);
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
      <h1 className={styles.title}>📈 Hızlı Üslü Sayılar – Beyin ve Zaman Yarışı</h1>

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
            <option value="easy">Kolay</option>
            <option value="medium">Orta</option>
            <option value="hard">Zor</option>
          </select>
          <button onClick={handleStart} className={styles.submitButton}>Başlat</button>
        </div>
      ) : timeLeft > 0 ? (
        <>
          <div className={styles.question}>
            {question.base}<sup>{question.exponent}</sup> = ?
          </div>
          <div className={styles.inputContainer}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={styles.input}
              autoFocus
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
