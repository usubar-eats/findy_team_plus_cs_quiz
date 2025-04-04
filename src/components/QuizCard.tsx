'use client';

import React, { useState, useEffect } from 'react';
import { Question } from '@/types/quiz';

interface QuizCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
}

export function QuizCard({ question, onAnswer }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // 問題が変わるたびに状態をリセット
  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [question]);

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  const handleNextClick = () => {
    onAnswer(selectedAnswer === question.correctIndex);
  };

  const getButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return 'bg-white hover:bg-gray-50 text-gray-900';
    }
    if (index === question.correctIndex) {
      return 'bg-green-100 border-green-500 text-gray-900';
    }
    if (index === selectedAnswer) {
      return 'bg-red-100 border-red-500 text-gray-900';
    }
    return 'bg-white text-gray-900';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">{question.text}</h2>
      <div className="space-y-3">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 border rounded-lg transition-colors ${getButtonClass(index)}`}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null}
          >
            {choice}
          </button>
        ))}
      </div>
      {showExplanation && (
        <div className="mt-6">
          <div className="p-4 bg-blue-50 rounded-lg mb-4">
            <h3 className="font-semibold mb-2 text-gray-900">解説</h3>
            <p className="text-gray-800">{question.explanation}</p>
          </div>
          <button
            onClick={handleNextClick}
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            次の問題へ
          </button>
        </div>
      )}
    </div>
  );
} 