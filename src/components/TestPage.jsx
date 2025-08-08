'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestPage({ examId }) {
    const [testData, setTestData] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(0);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (examId) {
            startTest();
        }
    }, [examId]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && testData) {
            handleSubmitTest();
        }
    }, [timeLeft]);

    const startTest = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/exams/start/${examId}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (data.success) {
                setTestData(data);
                setTimeLeft(data.duration * 60); // Convert to seconds
                setAnswers(new Array(data.questions.length).fill(null));
            } else {
                alert(data.message || 'Failed to start test');
            }
        } catch (error) {
            console.error('Error starting test:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionIndex, answer) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmitTest = async () => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('userToken');
            const response = await fetch(`/api/exams/submit/${testData.test_attempt_id}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    answers: answers
                })
            });

            const data = await response.json();
            if (data.success) {
                setResults(data);
                setShowResults(true);
            } else {
                alert(data.message || 'Failed to submit test');
            }
        } catch (error) {
            console.error('Error submitting test:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (showResults && results) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-center mb-8">Test Results</h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600">{results.score}</div>
                                <div className="text-gray-600">Score</div>
                            </div>
                            <div className="text-center p-6 bg-green-50 rounded-lg">
                                <div className="text-2xl font-bold text-green-600">{results.percentage}%</div>
                                <div className="text-gray-600">Percentage</div>
                            </div>
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="text-2xl font-bold text-purple-600">
                                    {results.passed ? 'PASSED' : 'FAILED'}
                                </div>
                                <div className="text-gray-600">Status</div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!testData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Test Not Found</h1>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const question = testData.questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl font-semibold">Test in Progress</h1>
                            <p className="text-gray-600">Question {currentQuestion + 1} of {testData.questions.length}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                            <div className="text-sm text-gray-600">Time Remaining</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Question */}
                    <div className="mb-8">
                        <div className="flex justify-between items-start mb-4">
                            <h2 className="text-xl font-semibold">
                                Question {currentQuestion + 1}
                            </h2>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {question.marks} mark{question.marks > 1 ? 's' : ''}
                            </span>
                        </div>
                        <p className="text-lg text-gray-800 mb-6">{question.question_text}</p>

                        {/* Options */}
                        <div className="space-y-3">
                            {question.options.map((option, index) => (
                                <label
                                    key={index}
                                    className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                                        answers[currentQuestion] === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                    }`}
                                >
                                    <input
                                        type={question.question_type === 'MCQ' ? 'checkbox' : 'radio'}
                                        name={`question-${currentQuestion}`}
                                        value={index}
                                        checked={
                                            question.question_type === 'MCQ'
                                                ? answers[currentQuestion]?.includes(index)
                                                : answers[currentQuestion] === index
                                        }
                                        onChange={(e) => {
                                            if (question.question_type === 'MCQ') {
                                                const currentAnswers = answers[currentQuestion] || [];
                                                if (e.target.checked) {
                                                    handleAnswerChange(currentQuestion, [...currentAnswers, index]);
                                                } else {
                                                    handleAnswerChange(
                                                        currentQuestion,
                                                        currentAnswers.filter(a => a !== index)
                                                    );
                                                }
                                            } else {
                                                handleAnswerChange(currentQuestion, index);
                                            }
                                        }}
                                        className="mr-3"
                                    />
                                    <span className="text-gray-800">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <div className="flex space-x-2">
                            {testData.questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentQuestion(index)}
                                    className={`w-10 h-10 rounded-full text-sm font-medium ${
                                        index === currentQuestion
                                            ? 'bg-blue-500 text-white'
                                            : answers[index]
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        {currentQuestion === testData.questions.length - 1 ? (
                            <button
                                onClick={handleSubmitTest}
                                disabled={submitting}
                                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                            >
                                {submitting ? 'Submitting...' : 'Submit Test'}
                            </button>
                        ) : (
                            <button
                                onClick={() => setCurrentQuestion(Math.min(testData.questions.length - 1, currentQuestion + 1))}
                                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 