'use client';

import React, { useState, useEffect } from 'react';
import { QuizCard } from '@/components/QuizCard';
import { ProgressBar } from '@/components/ProgressBar';
import { ResultCard } from '@/components/ResultCard';
import { questions } from '@/data/questions';
import { Question } from '@/types/quiz';

// Fisher-Yatesアルゴリズムを使用して配列をシャッフル
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 指定された数の問題をランダムに選択する
function selectRandomQuestions(allQuestions: Question[], count: number): Question[] {
  return shuffleArray(allQuestions).slice(0, count);
}

export default function QuizPage() {
  // 5問をランダムに選択
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>(() => 
    selectRandomQuestions(questions, 5)
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // コンポーネントのマウント完了後にローディング状態を解除
    setIsLoading(false);
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    
    if (currentQuestionIndex + 1 < shuffledQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    try {
      setIsLoading(true);
      setShuffledQuestions(selectRandomQuestions(questions, 5));
      setCurrentQuestionIndex(0);
      setCorrectCount(0);
      setIsCompleted(false);
    } finally {
      setIsLoading(false);
    }
  };

  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-700">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <ResultCard
          correctCount={correctCount}
          totalQuestions={shuffledQuestions.length}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={shuffledQuestions.length}
          correctCount={correctCount}
        />
        <QuizCard
          question={shuffledQuestions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
} 