// src/hooks/useQuiz.js
import { useState, useEffect } from 'react';

const useQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);

  // Fetch questions from API
  useEffect(() => {
    fetch("http://localhost:3030/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Timer countdown and question transition
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !submitted) {
      handleNextQuestion();
    }
  }, [timer, submitted]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setUserAnswers({ ...userAnswers, [questions[currentQuestion].id]: option });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setTimer(60);
      setSelectedAnswer(null);
    } else {
      setSubmitted(true);
    }
  };

  const handleStartOver = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimer(60);
    setSubmitted(false);
    setScore(0);
    setSelectedAnswer(null);
  };

  const calculateScore = () => {
    return questions.reduce((totalScore, question) => {
      if (userAnswers[question.id] === question.answers[0]) { // assuming the first answer is correct
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
  };

  useEffect(() => {
    if (submitted) {
      const finalScore = calculateScore();
      setScore(finalScore);
    }
  }, [submitted, userAnswers]);

  return {
    currentQuestion: questions[currentQuestion], // return the current question object
    timer,
    score,
    selectedAnswer,
    handleAnswerSelect,
    handleNextQuestion,
    handleStartOver
  };
};

export default useQuiz;