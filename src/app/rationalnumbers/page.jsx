'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss'; 

// Ortak bölen ile sadeleştirme
const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

// Pay ve paydayı sadeleştir
const simplify = (numer, denom) => {
  const divisor = gcd(Math.abs(numer), Math.abs(denom));
  return [numer / divisor, denom / divisor];
};

// Rasyonel sayı üretici
const generateRational = (range) => {
  const numer = Math.floor(Math.random() * range) + 1;
  const denom = Math.floor(Math.random() * range) + 1;
  return simplify(numer, denom);
};

// Rastgele işlem oluşturur (toplama ya da çıkarma)
const createQuestion = (level) => {
  const range = level === 'easy' ? 5 : level === 'medium' ? 10 : 20;
  const [aNum, aDen] = generateRational(range);
  const [bNum, bDen] = generateRational(range);
  const operator = Math.random() < 0.5 ? '+' : '−';

  const commonDen = aDen * bDen;
  const left = aNum * bDen;
  const right = bNum * aDen;
  const resultNum = operator === '+' ? left + right : left - right;
  const [resNum, resDen] = simplify(resultNum, commonDen);

  return {
    a: [aNum, aDen],
    b: [bNum, bDen],
    operator,
    result: [resNum, resDen],
  };
};

export default function RationalGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userNumerator, setUserNumerator] = useState('');
  const [userDenominator, setUserDenominator] = useState('');
  const [level, setLevel] = useState('medium');
  const [gameTime, setGameTime] = useState(60);
  const [question, setQuestion] = useState(() => createQuestion('medium'));
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [passUsed, setPassUsed] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const handleStart = () => {
    setScore(0);
    setTimeLeft(gameTime);
    setCorrectCount(0);
    setIncorrectCount(0);
    setPassUsed(0);
    setQuestion(createQuestion(level));
    setIsRunning(true);
  };

  const handleSubmit = () => {
    const num = parseInt(userNumerator.trim());
    const den = parseInt(userDenominator.trim());
    if (isNaN(num) || isNaN(den) || den === 0) return;

    const [userNum, userDen] = simplify(num, den);
    const [correctNum, correctDen] = question.result;
    const isCorrect = userNum === correctNum && userDen === correctDen;

    setFeedback(isCorrect ? '✅ Doğru!' : `❌ Yanlış! Doğru: ${correctNum}/${correctDen}`);
    isCorrect ? setCorrectCount(c => c + 1) : setIncorrectCount(i => i + 1);
    setScore(s => s + (isCorrect ? 1 : -1));

    setTimeout(() => {
      setFeedback(null);
      setQuestion(createQuestion(level));
    }, 1200);

    setUserNumerator('');
    setUserDenominator('');
  };

  const handlePass = () => {
    if (passUsed < 2) {
      setPassUsed(p => p + 1);
      setQuestion(createQuestion(level));
      setUserNumerator('');
      setUserDenominator('');
    }
  };

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && isRunning) {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [userNumerator, userDenominator, isRunning]);

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>➗ Rasyonel Sayılar Oyunu</h1>

      <div className={styles.timeScoreContainer}>
        <span>Kalan Süre: {timeLeft} sn</span>
        <span>Skor: {score}</span>
      </div>

      {!isRunning ? (
        <div className={styles.setupForm}>
          <label>Süre (sn):</label>
          <input
            type="number"
            value={gameTime}
            min={10}
            max={300}
            onChange={e => setGameTime(Number(e.target.value))}
            className={styles.input}
          />

          <label>Zorluk:</label>
          <select value={level} onChange={e => setLevel(e.target.value)}>
            <option value="easy">Kolay</option>
            <option value="medium">Orta</option>
            <option value="hard">Zor</option>
          </select>

          <button onClick={handleStart} className={styles.submitButton}>Başla</button>
        </div>
      ) : timeLeft > 0 ? (
        <>
          <div className={styles.question}>
            {question.a[0]}/{question.a[1]} {question.operator} {question.b[0]}/{question.b[1]} = ?
          </div>

          <div className={styles.inputContainer}>
            <input
              type="number"
              placeholder="Pay"
              value={userNumerator}
              onChange={e => setUserNumerator(e.target.value)}
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Payda"
              value={userDenominator}
              onChange={e => setUserDenominator(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.submitButton}>Cevapla</button>
            <button onClick={handlePass} className={styles.submitButton} disabled={passUsed >= 2}>Pas</button>
          </div>

          {feedback && <div className={styles.feedback}>{feedback}</div>}
          <div className={styles.passStatus}>Pas Hakkı: {2 - passUsed}</div>
        </>
      ) : (
        <div className={styles.gameOver}>
          ⏰ Süre Doldu! Skorun: {score}
          <div className={styles.stats}>✅ {correctCount} | ❌ {incorrectCount}</div>
          <button onClick={() => setIsRunning(false)} className={styles.submitButton}>Tekrar Oyna</button>
        </div>
      )}
    </main>
  );
}
