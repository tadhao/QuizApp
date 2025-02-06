import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import Question from './question';
import Timer from './timer';
import Result from './result';

const QuestionsList = () => [
  { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { id: 3, question: "What is 10 / 2?", options: ["3", "4", "5", "6"], answer: "5" },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(60);
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState("User");  // Default username
  const [score, setScore] = useState(0);  
  const [selectedAnswer, setSelectedAnswer] = useState(null);  
  const questions = QuestionsList();

  useEffect(() => {
    // Fetch the username from the server
    fetch("http://localhost:3030/user")
      .then((res) => res.json())
      .then((data) => setUsername(data.name))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

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
      if (userAnswers[question.id] === question.answer) {
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

  return (
    <Box style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Who Wants to Be a Millionaire?</Typography>
      <Typography variant="h6" gutterBottom>User: {username}</Typography>
      <Box display="flex" justifyContent="space-between" marginBottom="20px">
        <Timer timer={timer} />
        <Typography variant="h6">Score: {score}</Typography>
      </Box>
      {!submitted ? (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
        />
      ) : (
        <Result score={score} totalQuestions={questions.length} />
      )}
      {!submitted && <Button variant="contained" color="secondary" onClick={handleNextQuestion} style={{ margin: "10px" }}>Next</Button>}
      {submitted && <Button variant="contained" color="default" onClick={handleStartOver}>Start Over</Button>}
    </Box>
  );
};

export default QuizApp;