'use client';

import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  correctCount: number;
}

export function ProgressBar({ current, total, correctCount }: ProgressBarProps) {
  const progress = (current / total) * 100;
  const accuracy = ((correctCount / (current - 1)) * 100) || 0;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-900">
          問題 {current} / {total}
        </span>
        <span className="text-sm text-gray-900">
          正解率: {accuracy.toFixed(1)}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 