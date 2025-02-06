import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import useQuiz from '../hooks/useQuiz';
import Question from './question';
import Timer from './timer';

const QuizApp = () => {
  const [username, setUsername] = useState("User");
  const {
    currentQuestion,
    timer,
    score,
    selectedAnswer,
    handleAnswerSelect,
    handleNextQuestion,
    handleStartOver
  } = useQuiz();

  useEffect(() => {
    fetch("http://localhost:3030/user")
      .then((res) => res.json())
      .then((data) => setUsername(data.name))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  // If questions haven't loaded yet, show a loading message
  if (!currentQuestion) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Who Wants to Be a Millionaire?</Typography>
      <Typography variant="h6" gutterBottom>User: {username}</Typography>
      <Box display="flex" justifyContent="space-between" marginBottom="20px">
        <Timer timer={timer} />
        <Typography variant="h6">Score: {score}</Typography>
      </Box>

      {/* Render the question if currentQuestion is available */}
      {currentQuestion && (
        <Question
          question={currentQuestion.title}  // Use title for question
          options={currentQuestion.answers}  // Use answers array
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={selectedAnswer}
        />
      )}

      <Button variant="contained" color="secondary" onClick={handleNextQuestion} style={{ margin: "10px" }}>
        Next
      </Button>
      <Button variant="contained" color="default" onClick={handleStartOver}>Start Over</Button>
    </Box>
  );
};

export default QuizApp;