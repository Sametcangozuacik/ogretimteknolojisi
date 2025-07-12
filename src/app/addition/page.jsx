'use client';
import React, { useState, useEffect } from 'react';
import styles from './addition.module.scss';

const getRandomAngle = (mode) => {
  const angle = Math.floor(Math.random() * (mode === 'complementary' ? 89 : 179)) + 1;
  const total = mode === 'complementary' ? 90 : 180;
  return { angle, expected: total - angle, mode };
};

export default function ComplementarySupplementary() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState(getRandomAngle('complementary'));
  const [userTime, setUserTime] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [mode, setMode] = useState('complementary'); // 'complementary' or 'supplementary'

  const handleStart = () => {
    setScore(0);
    setCorrect(0);
    setIncorrect(0);
    setTimeLeft(userTime);
    setQuestion(getRandomAngle(mode));
    setIsRunning(true);
  };

  const handleSubmit = () => {
    const answer = Number(userAnswer.trim());
    if (isNaN(answer)) return;

    const isCorrect = answer === question.expected;

    setFeedback(
      isCorrect
        ? '✅ Doğru!'
        : `❌ Yanlış! Doğru cevap: ${question.expected}°`
    );

    setScore((s) => s + (isCorrect ? 1 : -1));
    isCorrect ? setCorrect((c) => c + 1) : setIncorrect((i) => i + 1);

    setTimeout(() => {
      setFeedback(null);
      setQuestion(getRandomAngle(mode));
    }, 1000);

    setUserAnswer('');
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
      <h1 className={styles.title}>📐 Tümler–Bütünler Açı Oyunu</h1>

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
          <label>Mod:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className={styles.input}
          >
            <option value="complementary">Tümler (90°)</option>
            <option value="supplementary">Bütünler (180°)</option>
          </select>
          <button onClick={handleStart} className={styles.submitButton}>
            Başlat
          </button>
        </div>
      ) : timeLeft > 0 ? (
        <>
          <div className={styles.question}>
            {question.mode === 'complementary' ? 'Tümler' : 'Bütünler'} açı tamamlayıcısı:  
            <strong> {question.angle}°</strong>
          </div>
          <div className={styles.inputContainer}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleSubmit} className={styles.submitButton}>
              Cevapla
            </button>
          </div>
          {feedback && (
            <div className={styles.answerFeedback}>{feedback}</div>
          )}
        </>
      ) : (
        <div className={styles.gameOver}>
          ⏰ Süre Doldu! Skor: {score}
          <div className={styles.stats}>
            ✅ {correct} | ❌ {incorrect}
          </div>
          <button onClick={() => setIsRunning(false)} className={styles.submitButton}>
            Tekrar Oyna
          </button>
        </div>
      )}
    </main>
  );
}
