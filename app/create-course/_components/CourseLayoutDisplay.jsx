// This component takes the course layout JSON and renders it in a readable format.

import React from 'react';

// Simple icons for visual flair.
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LevelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6M9 19H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v10a2 2 0 01-2 2h-4" /></svg>;

// This is the component function.
const CourseLayoutDisplay = ({ layout }) => {
  if (!layout) {
    return null;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 text-left">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{layout.courseName}</h1>
      <p className="text-lg text-gray-600 mb-6">{layout.description}</p>
      <div className="flex flex-wrap gap-4 mb-8 text-gray-700">
        <span className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-3 py-1 rounded-full">
          <LevelIcon /> {layout.level?.charAt(0).toUpperCase() + layout.level?.slice(1)}
        </span>
        <span className="flex items-center bg-green-100 text-green-800 text-sm font-medium mr-2 px-3 py-1 rounded-full">
          <ClockIcon /> {layout.duration}
        </span>
        <span className="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-3 py-1 rounded-full">
          {layout.category}
        </span>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Course Chapters</h2>
        <ul className="space-y-5">
          {layout.chapters?.map((chapter, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-800">{index + 1}. {chapter.chapterName}</h3>
                <span className="text-sm text-gray-500 font-medium"><ClockIcon />{chapter.duration}</span>
              </div>
              <p className="mt-2 text-gray-600 pl-6">{chapter.about}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// This is the crucial line that makes the component available for import.
export default CourseLayoutDisplay;
