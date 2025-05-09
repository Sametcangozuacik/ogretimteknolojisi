'use client';
import styles from './addition.module.scss';
import { useState, useEffect } from 'react';

// Zorluk seviyesine göre soruları değiştiren fonksiyon
const getRandomQuestion = (difficulty) => {
  const op = '÷';
  const maxRange = 100;

  let bMin, bMax;
  switch (difficulty) {
    case 'easy':
      bMin = 1;
      bMax = 9;
      break;
    case 'medium':
      bMin = 10;
      bMax = 19;
      break;
    case 'hard':
      bMin = 20;
      bMax = 50;
      break;
    default:
      bMin = 1;
      bMax = 9;
  }

  const b = Math.floor(Math.random() * (bMax - bMin + 1)) + bMin; // bölen
  const result = Math.floor(Math.random() * maxRange) + 1; // sonuç (1-10)
  const a = b * result; // bölünen = bölen x sonuç

  return { a, b, op, result };
};

export default function MainSection() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState(getRandomQuestion('easy'));
  const [userTime, setUserTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [passRights, setPassRights] = useState(2);
  const [difficulty, setDifficulty] = useState('easy'); // Zorluk seviyesi

  const handleSubmit = () => {
    const answer = Number(userAnswer);

    if (answer === question.result) {
      setScore((s) => s + 1);
      setAnswerStatus('correct');
    } else {
      if (passRights > 0) {
        setPassRights(passRights - 1);
        setAnswerStatus('pass');
      } else {
        setScore((s) => s - 1);
        setAnswerStatus('incorrect');
      }
    }

    setUserAnswer('');
    setQuestion(getRandomQuestion(difficulty)); // Zorluk seviyesine göre soru
  };

  const handleTimeChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setUserTime(newTime);
    setTimeLeft(newTime);
  };

  const handleStartStop = () => {
    if (!isTimeSet) {
      setIsTimeSet(true);
      setTimeLeft(userTime); // Süreyi başlatmadan önce sıfırla
    }
    setIsCountdownActive(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsTimeSet(false);
    setTimeLeft(userTime);
    setScore(0);
    setPassRights(2);
    setQuestion(getRandomQuestion(difficulty)); // Zorluk seviyesine göre reset
    setUserAnswer('');
    setAnswerStatus(null);
    setCountdown(3);
    setIsCountdownActive(false);
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

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>🧠 Sadece Bölme – Hızlı Matematik</h1>

      <div className={styles.timeScoreContainer}>
        <div className={styles.timeLeft}>Kalan Süre: {timeLeft} saniye</div>
        <div className={styles.score}>Skor: {score}</div>
        <div className={styles.passRights}>Pas Hakkı: {passRights}</div>
      </div>

      {/* Süre belirleme ve zorluk seçimi */}
      {!isTimeSet && !isCountdownActive && (
        <>
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
          </div>
          
          {/* Zorluk Seviyesi Seçimi */}
          <div className={styles.inputContainer}>
            <label htmlFor="difficulty" className={styles.inputLabel}>
              Zorluk Seviyesi:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={styles.input}
            >
              <option value="easy">Kolay</option>
              <option value="medium">Orta</option>
              <option value="hard">Zor</option>
            </select>
          </div>

          <button onClick={handleStartStop} className={styles.submitButton}>
            Başlat
          </button>
        </>
      )}

      {isCountdownActive && (
        <div className={styles.countdown}>
          {countdown > 0 ? countdown : 'Başla!'}
        </div>
      )}

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
              {answerStatus === 'correct' ? '✅ Doğru!' : ''}
              {answerStatus === 'incorrect' ? '❌ Yanlış!' : ''}
              {answerStatus === 'pass' ? '⏩ Pas Hakkı Kullanıldı!' : ''}
            </div>
          )}
        </>
      )}

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
