import React from 'react';
import { Box, Typography } from '@mui/material';

const Result = ({ score, totalQuestions }) => {
  const percentage = (score / totalQuestions) * 100;
  let message = percentage < 50 ? "Try Again and improve" : percentage < 90 ? "Nice attempt but try again" : "Way to go Champ!!";
  return (
    <Box>
      <Typography variant="h6">Your Score: {score} / {totalQuestions}</Typography>
      <Typography variant="h6">Percentage: {percentage.toFixed(2)}%</Typography>
      <Typography variant="h6">{message}</Typography>
    </Box>
  );
};

export default Result;