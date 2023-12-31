import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Category } from '../model/Interface.ts';


const LandingPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [numQuestions, setNumQuestions] = useState(5);
    const [difficulty, setDifficulty] = useState('');
    const [questionType, setQuestionType] = useState('multiple');
    const [category_id, setCategoryId] = useState<number | ''>('');

    const [questionOptions, setQuestionOptions] = useState<{
        numQuestions: number[];
        categories: Category[];
        difficulties: string[];
        questionTypes: string[];
    }>({
        numQuestions: [5, 10, 15],
        categories: [],
        difficulties: ['', 'easy', 'medium', 'hard'],
        questionTypes: ['multiple', 'boolean'],
    });


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api_category.php');
                const data = response.data.trivia_categories;
                console.log('Fetched categories:', data); // Log fetched categories
                setCategories(data);

                const categoryIds = data.map((category: { id: any; }) => category.id);
                const response2 = await axios.get(
                    `https://opentdb.com/api_count.php?category=${categoryIds.join(',')}`
                );
                const data2 = response2.data;
                const availableCategoryIds = data2?.categories ?? {}; // Use nullish coalescing to handle undefined/null data2
                const categoryOptions = data.filter((category: { id: { toString: () => string; }; }) =>
                    Object.keys(availableCategoryIds).includes(category.id.toString())
                );

                const numQuestionsOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 5);
                const difficultyOptions = ['easy', 'medium', 'hard'];
                const questionTypeOptions = ['multiple', 'boolean'];

                setQuestionOptions({
                    numQuestions: numQuestionsOptions,
                    categories: categoryOptions,
                    difficulties: difficultyOptions,
                    questionTypes: questionTypeOptions,
                });
            } catch (error) {
                console.log('Error fetching categories or question options:', error);
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

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = Number(e.target.value);
        setCategoryId(selectedCategoryId);

    };

    const navigate = useNavigate();

    const handleStartQuiz = () => {
        const selectedCategory = questionOptions.categories.find(
            (category) => category.id === category_id
        );

        navigate('/quiz', {
            state: {
                numQuestions: numQuestions,
                difficulty: difficulty,
                questionType: questionType,
                category: selectedCategory?.id || '',
            },
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Quiz Game App</h1>
            <div className="bg-white rounded-lg p-6 mb-4">
                <div className="mb-4">
                    <label htmlFor="numQuestions" className="text-2xl mr-2 font-semibold">
                        Number of Questions:
                    </label>
                    <select
                        id="numQuestions"
                        value={numQuestions}
                        onChange={handleNumQuestionsChange}
                        className="border rounded-md px-2 py-1"
                    >
                        {questionOptions.numQuestions.map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="categories" className="text-2xl mr-2 font-semibold">
                        Category:
                    </label>
                    <select
                        id="categories"
                        value={category_id}
                        onChange={handleCategoryChange}
                        className="border rounded-md px-2 py-1"
                    >
                        <option value="">
                            Any Category
                        </option>
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
                        className="border rounded-md px-2 py-1">
                        <option value="">
                            Any Difficulty
                        </option>
                        {questionOptions.difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                                {difficulty}
                            </option>
                        ))}
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
                        className="border rounded-md px-2 py-1">
                        {questionOptions.questionTypes.map((type) => (
                            <option key={type} value={type}>
                                {type === 'multiple' ? 'Multiple Choice' : 'True / False'}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={handleStartQuiz}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl font-semibold text-xl">
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );

};



export default LandingPage;