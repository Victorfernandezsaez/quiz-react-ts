import React from 'react';
import { Link } from 'react-router-dom';

type ResultProps = {
    score: number;
};

const Result: React.FC<ResultProps> = ({ score }) => {
    return (
        <div>
            <h2>Quiz Result</h2>
            <p>Your score: {score}</p>
            <Link to="/">Restart Quiz</Link>
        </div>
    );
};

export default Result;
