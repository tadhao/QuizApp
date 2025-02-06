import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const Question = ({ question, options, onAnswerSelect, selectedAnswer }) => (
  <Box>
    <Typography variant="h5" gutterBottom>{question}</Typography>
    <Box
      display="flex"
      flexDirection="column"  // Align items vertically
      alignItems="center"      // Center the buttons horizontally
      justifyContent="center"
    >
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const buttonColor = isSelected ? 'success' : 'primary';  // Change color if selected
        return (
          <Button
            variant="contained"
            color={buttonColor}
            key={index}
            onClick={() => onAnswerSelect(option)}
            style={{
              margin: '10px 0',        // Vertical margin between buttons
              width: '200px',          // Set a fixed width for rectangular shape
              padding: '10px',         // Adjust padding for rectangular shape
              textTransform: 'none',   // Prevents the text from being uppercase
              borderRadius: '8px',     // Optional: rounded corners for the buttons
            }}
          >
            {option}
          </Button>
        );
      })}
    </Box>
  </Box>
);

export default Question;