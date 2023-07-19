import React from 'react';

type OptionProps = {
    option: string;
    isSelected: boolean;
    onSelectOption: (option: string) => void;
};

const Option: React.FC<OptionProps> = ({ option, isSelected, onSelectOption }) => {
    const handleOptionSelect = () => {
        onSelectOption(option);
    };

    return (
        <div className="bg-white rounded-lg p-2 mb-2">
            <li
                className={
                    `text-2xl font-bold mb-6 text-black hover:text-3xl hover:cursor-pointer
                    ${isSelected ? 'selected' : ''}
                 `}

                onClick={handleOptionSelect}
            >
                {option}
            </li>
        </div>
    );
};

export default Option;
