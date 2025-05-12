'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss';

const getRandomQuestion = (level) => {
  let maxRange = 1000;
  if (level === 'easy') maxRange = 100;
  else if (level === 'medium') maxRange = 500;

  let a = Math.floor(Math.random() * maxRange) + 1;
  let b = Math.floor(Math.random() * maxRange) + 1;

  let result = a + b;
  return { a, b, op: '+', result };
};

export default function Addition() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState(getRandomQuestion('medium'));
  const [userTime, setUserTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [passCount, setPassCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [level, setLevel] = useState('medium');

  const handleSubmit = () => {
    if (userAnswer.trim() === '') return;

    const answer = Number(userAnswer);
    if (answer === question.result) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((s) => s + 1);
      setAnswerStatus('correct');
    } else {
      setIncorrectAnswers((prev) => prev + 1);
      setScore((s) => s - 1);
      setAnswerStatus('incorrect');
    }

    setUserAnswer('');
    setTimeout(() => {
      setAnswerStatus(null);
      setQuestion(getRandomQuestion(level));
    }, 1000);
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
    setCountdown(3);
    setIsCountdownActive(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsTimeSet(false);
    setTimeLeft(userTime);
    setScore(0);
    setPassCount(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setQuestion(getRandomQuestion(level));
    setUserAnswer('');
    setAnswerStatus(null);
  };

  const handlePass = () => {
    if (passCount < 2) {
      setPassCount((prev) => prev + 1);
      setUserAnswer('');
      setQuestion(getRandomQuestion(level));
    }
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    setQuestion(getRandomQuestion(newLevel));
  };

  const playSound = (status) => {
    const correctSound = new Audio('/sounds/correct.mp3');
    const incorrectSound = new Audio('/sounds/incorrect.mp3');

    if (status === 'correct') correctSound.play();
    else incorrectSound.play();
  };

  useEffect(() => {
    if (answerStatus) {
      playSound(answerStatus);
    }
  }, [answerStatus]);

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
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearTimeout(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === 'Enter' && isRunning) {
        e.preventDefault();
        handleSubmit();
      }
    };
    document.addEventListener('keydown', handleEnterPress);
    return () => document.removeEventListener('keydown', handleEnterPress);
  }, [userAnswer, isRunning]);

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.title}>🧠 Hızlı Toplama – Beyin ve Zaman Yarışı</h1>

      <div className={styles.timeScoreContainer}>
        <div className={styles.timeLeft}>Kalan Süre: {timeLeft} saniye</div>
        <div className={styles.score}>Skor: {score}</div>
      </div>

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
            <div className={styles.difficultyContainer}>
            <label>Zorluk Seviyesi:</label>
            <select onChange={(e) => handleLevelChange(e.target.value)} value={level}>
              <option value="easy">Kolay</option>
              <option value="medium">Orta</option>
              <option value="hard">Zor</option>
            </select>
          </div>
            <button onClick={handleStartStop} className={styles.submitButton}>
              Başlat
            </button>
          </div>          
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
              {question.a} + {question.b} = ?
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
            <button
              onClick={handlePass}
              className={styles.submitButton}
              disabled={passCount >= 2}
            >
              Pas
            </button>
          </div>

          {answerStatus && (
            <div className={styles.answerFeedback}>
              {answerStatus === 'correct' ? '✅ Doğru!' : '❌ Yanlış!' }
            </div>
          )}

          {passCount > 0 && (
            <div className={styles.passStatus}>
              Pas Hakkı Kalan: {2 - passCount}
            </div>
          )}
        </>
      )}

      {!isRunning && isTimeSet && !isCountdownActive && (
        <div className={styles.gameOver}>
          ⏰ Süre doldu! Toplam Skor: {score}
          <br />
          <button onClick={handleReset} className={styles.submitButton}>
            Yeniden Başlat
          </button>
          <div className={styles.stats}>
            Doğru: {correctAnswers} | Yanlış: {incorrectAnswers}
          </div>
        </div>
      )}
    </main>
  );
}
