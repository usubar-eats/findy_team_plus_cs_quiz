'use client';

import React from 'react';
import Link from 'next/link';

interface ResultCardProps {
  correctCount: number;
  totalQuestions: number;
  onRetry: () => void;
}

export function ResultCard({ correctCount, totalQuestions, onRetry }: ResultCardProps) {
  const percentage = (correctCount / totalQuestions) * 100;
  
  const getMessage = () => {
    if (percentage >= 80) return '素晴らしい結果です！';
    if (percentage >= 60) return '良い結果です！';
    return 'もう一度チャレンジしてみましょう！';
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">クイズ完了！</h2>
      <div className="text-6xl font-bold text-blue-500 mb-4">
        {percentage.toFixed(1)}%
      </div>
      <p className="text-lg mb-2 text-gray-900">
        {totalQuestions}問中{correctCount}問正解
      </p>
      <p className="text-gray-800 mb-8">{getMessage()}</p>
      <div className="space-x-4">
        <button
          onClick={onRetry}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          もう一度挑戦
        </button>
        <Link
          href="/"
          className="inline-block bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          トップに戻る
        </Link>
      </div>
    </div>
  );
} 