'use client';
import styles from './mainsection.module.scss';
import { useState, useEffect } from 'react';

const getRandomQuestion = (level) => {
  const ops = ['+', '-', '×', '÷'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  let maxNum = 20 + (level - 1) * 5;
  let a = Math.floor(Math.random() * maxNum) + 1;
  let b = Math.floor(Math.random() * maxNum) + 1;

  if (op === '÷') {
    a = a * b; // Bölme işlemi için tam sayı sonucu sağlanır
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
  const [question, setQuestion] = useState(getRandomQuestion(1));
  const [userTime, setUserTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isTimeSet, setIsTimeSet] = useState(false);

  const [countdown, setCountdown] = useState(3); // Yeni: Geri sayım
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const [level, setLevel] = useState(1); // Seviye
  const [isLevelSet, setIsLevelSet] = useState(false); // Seviye seçildi mi?

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!isCountdownActive || countdown <= 0) return;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [isCountdownActive, countdown]);

  useEffect(() => {
    if (countdown === 0 && isCountdownActive) {
      setIsCountdownActive(false);
      setIsRunning(true);
      setQuestion(getRandomQuestion(level)); // Seviye değişince yeni soru oluştur
    }
  }, [countdown, isCountdownActive, level]);

  const handleSubmit = () => {
    if (Number(userAnswer) === question.result) {
      setScore((s) => s + 1);
      setAnswerStatus('correct');
    } else {
      setScore((s) => s - 1);
      setAnswerStatus('incorrect');
    }
    setUserAnswer('');
    setQuestion(getRandomQuestion(level)); // Seviye değişince yeni soru
  };

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setUserTime(newTime);
    setTimeLeft(newTime);
  };

  const handleLevelChange = (e) => {
    setLevel(parseInt(e.target.value, 10));
  };

  const handleStartStop = () => {
    if (!isTimeSet || !isLevelSet) {
      return; // Seviye ve süre belirlenmeden oyun başlatılamaz
    }
    setCountdown(3); // Geri sayımı başlat
    setIsCountdownActive(true); // Geri sayımı aktif et
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsTimeSet(false);
    setIsLevelSet(false);
    setTimeLeft(userTime);
    setScore(0);
    setLevel(1); // Başlangıç seviyesini 1 yap
    setQuestion(getRandomQuestion(1)); // Seviye 1'den başla
    setUserAnswer('');
    setAnswerStatus(null);
  };

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>🧠 Hızlı Dört İşlem – Zekâ ve Zamanın Yarışı</h1>

      <div className={styles.timeScoreContainer}>
        <div className={styles.timeLeft}>Kalan Süre: {timeLeft} saniye</div>
        <div className={styles.score}>Skor: {score}</div>
        {isLevelSet && <div className={styles.timeLeft}>Seviye: {level}</div>}
      </div>

      {!isTimeSet && !isLevelSet && (
        <div className={styles.inputContainer}>
          <label htmlFor="levelSelect" className={styles.inputLabel}>
            Seviye Seçin:
          </label>
          <select
            id="levelSelect"
            value={level}
            onChange={handleLevelChange}
            className={styles.input}
          >
            <option value="1">Seviye 1</option>
            <option value="2">Seviye 2</option>
            <option value="3">Seviye 3</option>
            <option value="4">Seviye 4</option>
          </select>
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
          <button
            onClick={() => {
              setIsLevelSet(true);
              setIsTimeSet(true);
              handleStartStop(); // Başlat
            }}
            className={styles.submitButton}
          >
            Başlat
          </button>
        </div>
      )}

      {isCountdownActive ? (
        <div className={styles.countdown}>
          {countdown > 0 ? <h2>{countdown}</h2> : <h2>Başla!</h2>}
        </div>
      ) : timeLeft > 0 && isTimeSet && isLevelSet ? (
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
              className={`${styles.submitButton} ${answerStatus === 'correct' ? styles.correct : ''} ${answerStatus === 'incorrect' ? styles.incorrect : ''}`}
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
      ) : (
        isTimeSet && isLevelSet && (
          <div className={styles.gameOver}>
            ⏰ Süre doldu! Toplam Skor: {score}
            <br />
            <button onClick={handleReset} className={styles.submitButton}>
              Yeniden Başlat
            </button>
          </div>
        )
      )}
    </main>
  );
}
