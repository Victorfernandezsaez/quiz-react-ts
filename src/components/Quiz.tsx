import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Question from './Question';
import Result from './Result';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState<Question[]>([]);

    const navigate = useNavigate();

    const handleOptionSelect = (selectedOption: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            navigate('/result'); // Navigate to the result page
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=10');
                const data = response.data.results;
                const formattedQuestions = data.map((question: any) => ({
                    question: question.question,
                    options: [...question.incorrect_answers, question.correct_answer],
                    correctAnswer: question.correct_answer,
                }));
                setQuestions(formattedQuestions);
            } catch (error) {
                console.log('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col text-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            {currentQuestionIndex < questions.length ? (
                <Question

                    question={questions[currentQuestionIndex].question}
                    options={questions[currentQuestionIndex].options}
                    onSelectOption={handleOptionSelect}
                />
            ) : (
                <Result score={score} />
            )}
        </div>
    );
};

export default Quiz;
