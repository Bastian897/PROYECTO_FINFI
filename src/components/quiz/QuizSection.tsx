import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, HelpCircle, Eye, EyeOff } from 'lucide-react';
import QuizDisplay from './QuizDisplay';

interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: string;
}

interface QuizSectionProps {
  lessonId: string;
}

export default function QuizSection({ lessonId }: QuizSectionProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    options: ['', '', '', '']
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const validateForm = (question: Partial<Question>) => {
    const isValid = Boolean(
      question.text?.trim() &&
      question.correctAnswer &&
      (question.type === 'true-false' || 
        (question.options?.every(opt => opt.trim()) && 
         question.options?.length >= 2))
    );
    setIsFormValid(isValid);
    return isValid;
  };

  const addQuestion = () => {
    if (validateForm(currentQuestion)) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: currentQuestion.text!,
        type: currentQuestion.type as 'multiple-choice' | 'true-false',
        options: currentQuestion.type === 'multiple-choice' 
          ? currentQuestion.options!
          : ['True', 'False'],
        correctAnswer: currentQuestion.correctAnswer!
      };
      
      setQuestions([...questions, newQuestion]);
      setCurrentQuestion({
        type: 'multiple-choice',
        options: ['', '', '', '']
      });
      setIsFormValid(false);
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(currentQuestion.options || [])];
    newOptions[index] = value;
    const updatedQuestion = { ...currentQuestion, options: newOptions };
    setCurrentQuestion(updatedQuestion);
    validateForm(updatedQuestion);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuestion = { ...currentQuestion, text: e.target.value };
    setCurrentQuestion(updatedQuestion);
    validateForm(updatedQuestion);
  };

  const handleCorrectAnswerChange = (value: string) => {
    const updatedQuestion = { ...currentQuestion, correctAnswer: value };
    setCurrentQuestion(updatedQuestion);
    validateForm(updatedQuestion);
  };

  if (isPreviewMode) {
    return (
      <div className="bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Quiz Preview</h2>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Exit Preview
            </button>
          </div>
        </div>
        <QuizDisplay questions={questions} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create Quiz</h2>
            <p className="mt-1 text-sm text-gray-500">Add questions to test student understanding</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <HelpCircle className="h-4 w-4" />
              <span>{questions.length} questions</span>
            </div>
            {questions.length > 0 && (
              <button
                onClick={() => setIsPreviewMode(true)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Preview Quiz
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <select
              value={currentQuestion.type}
              onChange={(e) => setCurrentQuestion({
                ...currentQuestion,
                type: e.target.value as 'multiple-choice' | 'true-false',
                options: e.target.value === 'true-false' ? ['True', 'False'] : ['', '', '', '']
              })}
              className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="true-false">True/False</option>
            </select>
          </div>

          <div>
            <textarea
              value={currentQuestion.text || ''}
              onChange={handleQuestionChange}
              placeholder="Enter your question"
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none"
            />
          </div>

          {currentQuestion.type === 'multiple-choice' && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    onClick={() => handleCorrectAnswerChange(option)}
                    className={`p-2 rounded-full transition-colors ${
                      currentQuestion.correctAnswer === option
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {currentQuestion.type === 'true-false' && (
            <div className="flex items-center space-x-4">
              {['True', 'False'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleCorrectAnswerChange(option)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentQuestion.correctAnswer === option
                      ? 'bg-green-100 text-green-800 border-2 border-green-500'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={addQuestion}
              disabled={!isFormValid}
              className={`inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white transition-colors ${
                isFormValid
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </button>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-500">{question.type}</span>
                    </div>
                    <p className="mt-2 font-medium text-gray-900">{question.text}</p>
                    <div className="mt-3 space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            option === question.correctAnswer
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : 'bg-gray-50 text-gray-600'
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => removeQuestion(question.id)}
                    className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}