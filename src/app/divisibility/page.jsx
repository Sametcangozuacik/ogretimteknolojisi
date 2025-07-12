'use client';
import React, { useState, useEffect } from 'react';
import styles from './divisibility.module.scss';

const checks = {
  2: (num) => num % 2 === 0,
  3: (num) => num.toString().split('').reduce((a, b) => a + +b, 0) % 3 === 0,
  4: (num) => Number(num.toString().slice(-2)) % 4 === 0,
  5: (num) => ['0', '5'].includes(num.toString().slice(-1)),
  8: (num) => Number(num.toString().slice(-3)) % 8 === 0,
  9: (num) => num.toString().split('').reduce((a, b) => a + +b, 0) % 9 === 0,
};

const allDivisors = [2, 3, 4, 5, 8, 9];

const getRandomNumber = () =>
  Math.floor(Math.random() * (9999 - 100 + 1)) + 100;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function DivisibilityGame() {
  const [number, setNumber] = useState(null);
  const [divisorsOrder, setDivisorsOrder] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [disableButtons, setDisableButtons] = useState(false);

  const startGame = () => {
    const shuffled = shuffle(allDivisors);
    setDivisorsOrder(shuffled);
    setIndex(0);
    setScore(0);
    setTimeLeft(60);
    setNumber(getRandomNumber());
    setFeedback(null);
    setIsRunning(true);
    setDisableButtons(false);
  };

  const nextQuestion = () => {
    if (index + 1 >= divisorsOrder.length) {
      setDivisorsOrder(shuffle(allDivisors));
      setIndex(0);
    } else {
      setIndex((i) => i + 1);
    }
    setNumber(getRandomNumber());
  };

  const handleAnswer = (answer) => {
    if (!isRunning || disableButtons) return;

    const currentDivisor = divisorsOrder[index];
    const correct = checks[currentDivisor](number);
    const userSaysYes = answer.toLowerCase() === 'evet';

    setFeedback(
      userSaysYes === correct
        ? '✅ Doğru!'
        : `❌ Yanlış! ${number} sayısı ${currentDivisor}'ye ${correct ? '' : 'bölünmez'} bölünür.`
    );

    setScore((s) =>
      userSaysYes === correct ? s + 1 : Math.max(0, s - 1)
    );

    // Butonları geçici olarak devre dışı bırak
    setDisableButtons(true);

    setTimeout(() => {
      setFeedback(null);
      setDisableButtons(false);
      nextQuestion();
    }, 1000);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft <= 0) {
      setIsRunning(false);
      setFeedback('⏰ Süre doldu!');
      setDisableButtons(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  const currentDivisor = divisorsOrder[index];

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>🔢 Bölünebilme Kuralları Oyunu</h1>

      {!isRunning ? (
        <button onClick={startGame} className={styles.startButton}>
          Başlat
        </button>
      ) : (
        <>
          <div className={styles.question}>
            {number} sayısı {currentDivisor}'ye bölünebilir mi?
          </div>

          <div>
            <button
              onClick={() => handleAnswer('evet')}
              disabled={disableButtons}
              className={`${styles.button} ${styles.yes}`}
            >
              Evet
            </button>
            <button
              onClick={() => handleAnswer('hayır')}
              disabled={disableButtons}
              className={`${styles.button} ${styles.no}`}
            >
              Hayır
            </button>
          </div>

          <div className={styles.feedback}>{feedback}</div>
          <div className={styles.status}>
            Skor: {score} | Kalan Süre: {timeLeft} sn
          </div>
        </>
      )}
    </main>
  );
}
