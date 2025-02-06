import React from 'react';
import { Typography } from '@mui/material';

const Timer = ({ timer }) => <Typography variant="h6">Time Left: {timer}s</Typography>;

export default Timer;