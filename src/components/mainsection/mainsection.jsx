'use client';
import styles from './mainsection.module.scss';
import { useState, useEffect } from 'react';

const getRandomQuestion = () => {
  const ops = ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let maxRange = 20;

  let a = Math.floor(Math.random() * maxRange) + 1;
  let b = Math.floor(Math.random() * maxRange) + 1;

  if (op === '÷') {
    a = a * b; // Bölme işlemini dengeli yapmak için
  }

  let result;
  switch (op) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '×':
      result = a * b;
      break;
    case '÷':
      result = a / b;
      break;
    default:
      result = 0;
  }

  return { a, b, op, result };
};

export default function MainSection() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState(getRandomQuestion());
  const [userTime, setUserTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const handleSubmit = () => {
    const answer = Number(userAnswer);
    if (answer === question.result) {
      setScore((s) => s + 1);
      setAnswerStatus('correct');
    } else {
      setScore((s) => s - 1);
      setAnswerStatus('incorrect');
    }
    setUserAnswer('');
    setQuestion(getRandomQuestion()); // Yeni soru oluştur
  };

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setUserTime(newTime);
    setTimeLeft(newTime);
  };

  const handleStartStop = () => {
    if (!isTimeSet) {
      setIsTimeSet(true);
    }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsTimeSet(false);
    setTimeLeft(userTime);
    setScore(0);
    setQuestion(getRandomQuestion());
    setUserAnswer('');
    setAnswerStatus(null);
  };

  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      setIsCountdownActive(false);
      setIsRunning(true);
    }
  }, [countdown, isCountdownActive]);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  // Enter tuşuna basıldığında handleSubmit fonksiyonunu çağırma
  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener('keydown', handleEnterPress);
    return () => document.removeEventListener('keydown', handleEnterPress);
  }, [userAnswer]);

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>🧠 Hızlı Dört İşlem – Zekâ ve Zamanın Yarışı</h1>

      <div className={styles.timeScoreContainer}>
        <div className={styles.timeLeft}>Kalan Süre: {timeLeft} saniye</div>
        <div className={styles.score}>Skor: {score}</div>
      </div>

      {/* Süre belirleme ve başlatma ekranı */}
      {!isTimeSet && !isCountdownActive && (
        <div className={styles.inputContainer}>
          <label htmlFor="timeInput" className={styles.inputLabel}>
            Süre Belirle:
          </label>
          <input
            id="timeInput"
            type="number"
            value={userTime}
            onChange={handleTimeChange}
            className={styles.input}
            min="1"
            max="300"
          />
          <button onClick={handleStartStop} className={styles.submitButton}>
            Başlat
          </button>
        </div>
      )}

      {/* 3-2-1 Başla animasyonu */}
      {isCountdownActive && (
        <div className={styles.countdown}>
          {countdown > 0 ? countdown : 'Başla!'}
        </div>
      )}

      {/* Oyun başladıktan sonraki ekran */}
      {isRunning && (
        <>
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              {question.a} {question.op} {question.b} = ?
            </div>
          </div>

          <div className={styles.inputContainer}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={styles.input}
            />
            <button
              onClick={handleSubmit}
              className={`${styles.submitButton} ${
                answerStatus === 'correct' ? styles.correct : ''
              } ${answerStatus === 'incorrect' ? styles.incorrect : ''}`}
            >
              Cevapla
            </button>
          </div>

          {answerStatus && (
            <div className={styles.answerFeedback}>
              {answerStatus === 'correct' ? '✅ Doğru!' : '❌ Yanlış!'}
            </div>
          )}
        </>
      )}

      {/* Zaman dolduğunda game over ekranı */}
      {!isRunning && isTimeSet && (
        <div className={styles.gameOver}>
          ⏰ Süre doldu! Toplam Skor: {score}
          <br />
          <button onClick={handleReset} className={styles.submitButton}>
            Yeniden Başlat
          </button>
        </div>
      )}
    </main>
  );
}
