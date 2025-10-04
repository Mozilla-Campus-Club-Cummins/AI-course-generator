"use client";

import React, { useState } from 'react';
import { BiCategory } from "react-icons/bi";
import { TbTargetArrow } from "react-icons/tb";
import { IoIosOptions } from "react-icons/io";
import { Button } from '@/components/ui/button';

// --- Form Components for each step ---
// These components are defined within the main file for this page.

const CategoryForm = ({ onSelectCategory, selectedCategory }) => {
    const categories = [
        { id: 1, name: 'Education', description: 'Academic subjects and skills for students.' },
        { id: 2, name: 'Work & Career', description: 'Professional development and career-building skills.' },
        { id: 3, name: 'Computer Science', description: 'Foundational topics in programming, algorithms, and data structures.' },
        { id: 4, name: 'Cooking & Recipes', description: 'Culinary skills, from basic meal prep to advanced techniques.' },
        { id: 5, name: 'Health & Wellness', description: 'Topics on fitness, nutrition, and mental health.' },
        { id: 6, name: 'Creative Arts', description: 'Explore skills in art, music, writing, and design.' },
        { id: 7, name: 'Personal Finance', description: 'Learn to manage money, invest, and plan for your financial future.' },
        { id: 8, name: 'Languages', description: 'Learn a new language or improve your existing skills.' },
    ];
    
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customCategory, setCustomCategory] = useState('');
    
    const handleCustomCategory = () => {
        if (customCategory.trim() !== '') {
            onSelectCategory(customCategory);
        }
    };
    
    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-semibold mb-6 text-center'>Choose Your Course Category</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.name)}
                        className={`p-6 border-2 rounded-xl shadow-sm hover:shadow-lg focus:ring-2 focus:ring-blue-950 transition-all cursor-pointer text-left ${selectedCategory === category.name ? 'border-blue-950 bg-blue-50 shadow-md' : 'border-gray-200'}`}
                    >
                        <h4 className='text-lg font-bold text-gray-800'>{category.name}</h4>
                        <p className='text-gray-500 text-sm mt-2'>{category.description}</p>
                    </button>
                ))}
                
                <div className='p-6 border-2 rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer text-left border-gray-200 flex flex-col justify-center items-center'>
                    <Button variant='outline' onClick={() => setShowCustomInput(!showCustomInput)}>
                        {showCustomInput ? 'Hide Custom Input' : 'Add Your Own'}
                    </Button>
                    {showCustomInput && (
                        <div className="mt-4 w-full">
                            <input
                                type="text"
                                placeholder="Enter custom category"
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                className="w-full p-3 border rounded-md"
                            />
                            <Button onClick={handleCustomCategory} className="mt-2 w-full">
                                Select Custom Category
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const TopicDetailsForm = ({ courseDetails, onInputChange }) => {
    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-semibold mb-6 text-center'>Course Topic and Description</h3>
            <div className='space-y-6'>
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">Course Topic</label>
                    <input
                        type="text"
                        id="topic"
                        placeholder="e.g., Introduction to React with Shadcn/ui"
                        value={courseDetails.topic}
                        onChange={(e) => onInputChange('topic', e.target.value)}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Course Description</label>
                    <textarea
                        id="description"
                        rows="4"
                        placeholder="Provide a brief summary of the course content..."
                        value={courseDetails.description}
                        onChange={(e) => onInputChange('description', e.target.value)}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all"
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

const OptionsForm = ({ courseOptions, onOptionChange }) => {
    const difficultyOptions = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
    ];
    const durationOptions = [
        { value: '1', label: '1 Hour' },
        { value: '2', label: '2 Hours' },
        { value: '3+', label: '3+ Hours' },
    ];
    
    const Switch = ({ checked, onCheckedChange }) => (
        <label className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} />
                <div className={`block w-12 h-6 rounded-full transition-colors ${checked ? 'bg-blue-950' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${checked ? 'translate-x-6' : ''}`}></div>
            </div>
        </label>
    );

    return (
        <div className='mt-8'>
            <h3 className='text-2xl font-semibold mb-6 text-center'>Course Options</h3>
            <div className='space-y-8'>
                {/* Difficulty Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                    <div className="flex gap-4">
                        {difficultyOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onOptionChange('difficulty', option.value)}
                                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${courseOptions.difficulty === option.value ? 'bg-blue-950 text-white' : 'bg-gray-100'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Duration Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Duration</label>
                    <div className="flex gap-4">
                        {durationOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => onOptionChange('duration', option.value)}
                                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${courseOptions.duration === option.value ? 'bg-blue-950 text-white' : 'bg-gray-100'}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add Video Section */}
                <div className="flex items-center justify-between">
                    <label htmlFor="add-video-switch" className="text-sm font-medium text-gray-700">Add a Video?</label>
                    <Switch
                        checked={courseOptions.addVideo}
                        onCheckedChange={(checked) => onOptionChange('addVideo', checked)}
                    />
                </div>

                {/* Chapters Section */}
                <div>
                    <label htmlFor="chapters" className="block text-sm font-medium text-gray-700 mb-1">Number of Chapters</label>
                    <input
                        type="number"
                        id="chapters"
                        placeholder="e.g., 5"
                        value={courseOptions.chapters}
                        onChange={(e) => onOptionChange('chapters', e.target.value)}
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-950 focus:border-transparent transition-all"
                    />
                </div>
            </div>
        </div>
    );
};

// Main App Component
export default function CreateCourse() {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        category: null,
        topic: '',
        description: '',
        difficulty: '',
        duration: '',
        addVideo: false,
        chapters: '',
    });

    const StepperOptions = [{
        id: 1,
        name: 'Category',
        icon: <BiCategory />
    },
    {
        id: 2,
        name: 'Topic and Details',
        icon: <TbTargetArrow />
    },
    {
        id: 3,
        name: 'Options',
        icon: <IoIosOptions />
    }];

    const handlePrevious = () => {
        if (activeStep > 1) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleNext = () => {
        if (activeStep < StepperOptions.length) {
            setActiveStep(activeStep + 1);
        }
    };
    
    const handleGenerateCourse = () => {
        alert(`Course Generated Successfully!`);
    };
    
    const handleFormChange = (key, value) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const isLastStep = activeStep === StepperOptions.length;
    const buttonText = isLastStep ? 'Generate Course Layout' : 'Next';
    const handleClick = isLastStep ? handleGenerateCourse : handleNext;

    const isNextDisabled = (activeStep === 1 && !formData.category) ||
                           (activeStep === 2 && (!formData.topic || !formData.description)) ||
                           (activeStep === 3 && (!formData.difficulty || !formData.duration || !formData.chapters));

    const renderStepContent = () => {
        switch (activeStep) {
            case 1:
                return <CategoryForm onSelectCategory={(value) => handleFormChange('category', value)} selectedCategory={formData.category} />;
            case 2:
                return <TopicDetailsForm courseDetails={formData} onInputChange={(key, value) => handleFormChange(key, value)} />;
            case 3:
                return <OptionsForm courseOptions={formData} onOptionChange={(key, value) => handleFormChange(key, value)} />;
            default:
                return null;
        }
    };

    return (
        <div className='bg-gray-50 flex flex-col items-center min-h-screen p-6'>
            <div className='w-full bg-white p-8 rounded-2xl shadow-xl'>
                <div className='flex flex-col justify-center items-center mt-10'>
                    <h2 className='text-4xl font-medium'>Create Course</h2>
                    <div className='flex items-center mt-20 w-full max-w-2xl justify-between px-8'>
                        {StepperOptions.map((option, index) => (
                            <React.Fragment key={option.id}>
                                <div className='flex flex-col items-center'>
                                    <div className={`text-3xl p-2 rounded-full ${activeStep >= option.id ? 'bg-blue-950 text-white' : 'bg-gray-200'}`}>
                                        {option.icon}
                                    </div>
                                    <h3 className='mt-2 text-sm text-center'>{option.name}</h3>
                                </div>
                                {index < StepperOptions.length - 1 && (
                                    <div className={`flex-1 h-1 rounded-full mx-4 ${activeStep > option.id ? 'bg-blue-950' : 'bg-gray-200'}`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className='mt-10'>
                    {renderStepContent()}
                </div>

                <div className='flex justify-center mt-10 gap-5'>
                    <Button onClick={handlePrevious} variant='outline' disabled={activeStep === 1}>Previous</Button>
                    <Button onClick={handleClick}  disabled={isNextDisabled}>{buttonText} </Button>
                </div>
            </div>
        </div>
    );
}