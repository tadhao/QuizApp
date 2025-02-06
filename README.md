# Quiz App

A simple interactive quiz application built with React. This app allows users to answer multiple-choice questions, tracks their score, and provides a timer. At the end of the quiz, users can see their score and percentage.

## Features

- Multiple-choice questions with options
- Timer that counts down from 60 seconds
- Dynamic score calculation based on correct answers
- Displays the final score and percentage at the end
- Option to restart the quiz (coming soon)

## Demo

![Quiz App Demo](path_to_your_demo_image.gif)

## Installation

Follow the steps below to get the project up and running on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/quiz-app.git
```

### 2. Navigate to the Project Directory
```bash
cd quiz-app
```

### 3.  Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 4.  Run the Development Server

```bash
npm start
```
This will start the React development server and open the app in your default browser.

## Technology Stack

- **React** - Frontend framework
- **Material-UI** - Styling framework
- **JavaScript (ES6)** - Programming language
- **CSS** - For custom styling

## API

The app fetches the username data from a local backend (e.g., `http://localhost:3030/user`). Make sure to set up the backend API for the app to work correctly. If the API is unavailable, it defaults to "User"

For setting up the API follow the step below,
### `json-server --watch db.json --port 3030`

Runs the simulated backend for the project, it uses the following library: [json-server](https://github.com/typicode/json-server)
These are the routes that are availble for this task:
`http://localhost:3030/user`
`http://localhost:3030/questions/[1-3]`
`http://localhost:3030/correct_answers/[1-3]`

## Components

- **App**: The main component that renders the entire quiz interface.
- **Question**: Displays the current question and answer options.
- **Timer**: Displays the countdown timer.
- **Score**: Displays the current score of the user.
- **Result**: Displays the final score and percentage after the quiz is completed.