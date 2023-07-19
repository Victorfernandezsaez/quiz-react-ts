import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../model/Interface.ts'


const LandingPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);

    const [numQuestions, setNumQuestions] = useState(5);

    const [difficulty, setDifficulty] = useState('');
    const [questionType, setQuestionType] = useState('multiple');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api_category.php');
                const data = response.data.trivia_categories;
                setCategories(data);
            } catch (error) {
                console.log('Error fetching categories:', error);
            }
        };


        fetchCategories();
    }, []);

    const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNumQuestions(Number(e.target.value));
    };
    const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(e.target.value);
    };

    const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuestionType(e.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Quiz Game App</h1>
            <div className="bg-white rounded-lg p-6 mb-4">
                <div className="mb-4">
                    <label htmlFor="numQuestions" className=" text-2xl mr-2 font-semibold">
                        Number of Questions:
                    </label>
                    <select
                        id="numQuestions"
                        value={numQuestions}
                        onChange={handleNumQuestionsChange}
                        className="border rounded-md px-2 py-1"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>

                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="text-2xl mr-2 font-semibold">
                        Category:
                    </label>
                    <select id="category" className="border rounded-md px-2 py-1">
                        <option value="">Any Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="difficulty" className="text-2xl mr-2 font-semibold">
                        Difficulty:
                    </label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={handleDifficultyChange}
                        className="border rounded-md px-2 py-1"
                    >
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="questionType" className="text-2xl mr-2 font-semibold">
                        Question Type:
                    </label>
                    <select
                        id="questionType"
                        value={questionType}
                        onChange={handleQuestionTypeChange}
                        className="border rounded-md px-2 py-1"
                    >
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True / False</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <Link to="/quiz">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold text-xl">
                            Start Quiz
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
