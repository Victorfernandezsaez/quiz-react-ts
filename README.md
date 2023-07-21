# Quiz Game App

This is a simple quiz game app built with Vite, React, TypeScript, Tailwind CSS, and Axios. It allows users to choose the number of questions, difficulty level, question type, and category for the quiz.

## Features

- Choose the number of questions for the quiz (between 5 and 50).
- Select the difficulty level (easy, medium, or hard) for the questions.
- Choose the question type (multiple-choice or true/false).
- Select a specific category for the questions (optional).
- Start the quiz and answer the selected number of questions with random trivia.

## Setup

1. Clone the repository:

git clone <repository-url>

2. Navigate to the project directory:

cd quiz-game-app

3. Install dependencies:

npm install

4. Run the development server:

npm run dev

## API Source

The app uses the Open Trivia Database API (https://opentdb.com) to fetch quiz questions and category information.

## Libraries Used

- Vite: Fast build tool and development server for modern web projects.
- React: JavaScript library for building user interfaces.
- TypeScript: Static type-checking for JavaScript.
- Tailwind CSS: Utility-first CSS framework for rapidly building custom designs.
- Axios: Promise-based HTTP client for making API requests.
- React Router: Declarative routing for React applications.

## Routing

The app uses React Router for client-side routing. Here's how the routes are set up:

- `/`: Landing page where users can select quiz options.
- `/quiz`: Quiz page where users can start the quiz and answer questions.
- `/result`: Result page to display the quiz score and summary.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.
