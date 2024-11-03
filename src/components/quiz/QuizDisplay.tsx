import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: string;
}

interface QuizDisplayProps {
  questions: Question[];
}

export default function QuizDisplay({ questions }: QuizDisplayProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="p-6">
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                {index + 1}
              </span>
              <span className="text-sm text-gray-500">{question.type}</span>
            </div>
            
            <p className="text-lg font-medium text-gray-900 mb-6">{question.text}</p>
            
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(question.id, option)}
                  disabled={showResults}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    answers[question.id] === option
                      ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                      : 'bg-white text-gray-700 border-2 border-transparent hover:bg-gray-50'
                  } ${
                    showResults
                      ? option === question.correctAnswer
                        ? 'bg-green-100 text-green-700 border-green-500'
                        : answers[question.id] === option
                        ? 'bg-red-100 text-red-700 border-red-500'
                        : ''
                      : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResults && (
                      option === question.correctAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : answers[question.id] === option ? (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ) : null
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!showResults && Object.keys(answers).length === questions.length && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowResults(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Submit Answers
          </button>
        </div>
      )}

      {showResults && (
        <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Quiz Results
          </h3>
          <p className="text-gray-600">
            You got {calculateScore()} out of {questions.length} questions correct.
          </p>
        </div>
      )}
    </div>
  );
}