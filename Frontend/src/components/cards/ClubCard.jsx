import React from 'react';
import { Link } from 'react-router-dom';

const getCategoryColors = (category) => {
    switch (category) {
        case 'Technology':
        case 'Technology / Engineering':
            return { border: 'border-blue-500', text: 'text-blue-600' };
        case 'Arts & Culture':
            return { border: 'border-purple-500', text: 'text-purple-600' };
        case 'Academics':
        case 'Academics / Political':
            return { border: 'border-yellow-500', text: 'text-yellow-600' };
        case 'Community Service':
            return { border: 'border-green-500', text: 'text-green-600' };
        case 'Business / Finance':
        case 'Professional Development':
            return { border: 'border-indigo-500', text: 'text-indigo-600' };
        default:
            return { border: 'border-gray-500', text: 'text-gray-600' };
    }
};

const ClubCard = ({ club }) => {
    const { border, text } = getCategoryColors(club.category); 

    return (
        <div 
            className={`bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 cursor-pointer 
                        border-b-4 ${border} flex flex-col h-full`}
        >
            <div className="flex items-start mb-3">
                <h3 className="text-xl font-extrabold text-primary break-words">
                    {club.name}
                </h3>
            </div>
            
            <p className="text-sm font-semibold mb-3">
                Category: <span className={`${text} font-bold`}>{club.category}</span>
            </p>

            <p className="text-gray-600 leading-relaxed text-sm mb-4 flex-grow">
                {club.description.substring(0, 250)}
            </p>
        </div>
    );
};

export default ClubCard;