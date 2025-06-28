'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss';

const getRandomQuestion = (level) => {
  const range = level === 'easy' ? 10 : level === 'medium' ? 100 : 500;
  const operators = ['+', '-', '*', '/'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let a, b, result;

  switch (operator) {
    case '+':
      a = Math.floor(Math.random() * range) + 1;
      b = Math.floor(Math.random() * range) + 1;
      result = a + b;
      break;
    case '-':
      a = Math.floor(Math.random() * range) + 1;
      b = Math.floor(Math.random() * range) + 1;
      if (b > a) [a, b] = [b, a];
      result = a - b;
      break;
    case '*':
      a = Math.floor(Math.random() * (range / 5)) + 1;
      b = Math.floor(Math.random() * (range / 5)) + 1;
      result = a * b;
      break;
    case '/':
      b = Math.floor(Math.random() * (range / 5)) + 1;
      result = Math.floor(Math.random() * (range / 5)) + 1;
      a = b * result;
      break;
  }

  return { a, b, operator, result };
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
    setFeedback(isCorrect ? '✅ Doğru!' : `❌ Yanlış! Doğru cevap: ${question.result}`);
    setScore((s) => s + (isCorrect ? 1 : -1));
    isCorrect ? setCorrect((c) => c + 1) : setIncorrect((i) => i + 1);

    setTimeout(() => {
      setFeedback(null);
      setQuestion(getRandomQuestion(level));
    }, 1000);

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

  const displayOperator = (op) => {
    if (op === '*') return 'x';
    if (op === '/') return '÷';
    return op;
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>🧠 Hızlı İşlem – Dört İşlem Yarışı</h1>

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
            {question.a} {displayOperator(question.operator)} {question.b} = ?
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
