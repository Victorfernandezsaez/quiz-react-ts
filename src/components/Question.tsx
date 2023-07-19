import React from 'react';
import Option from './Option';

type QuestionProps = {
    question: string;
    options: string[];
    onSelectOption: (selectedOption: string) => void;
};

const Question: React.FC<QuestionProps> = ({
    question,
    options,
    onSelectOption,
}) => {
    const handleOptionSelect = (selectedOption: string) => {
        onSelectOption(selectedOption);
    };

    return (
        <div>
            <h2 className="text-4xl font-bold mb-10 text-white">{question}</h2>
            <ul >
                {options.map((option) => (
                    <Option
                        key={option}
                        option={option}
                        isSelected={false}
                        onSelectOption={handleOptionSelect}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Question;
