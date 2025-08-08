'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function QuestionManagement() {
    const [questions, setQuestions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [showUploadCSV, setShowUploadCSV] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const router = useRouter();

    const [questionForm, setQuestionForm] = useState({
        course_id: '',
        question_text: '',
        question_type: 'MCQ',
        options: ['', '', '', ''],
        correct_answers: [],
        marks: 1,
        difficulty: 'medium',
        explanation: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('adminToken');

            // Fetch courses
            const coursesResponse = await fetch('http://127.0.0.1:8000/api/courses/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (coursesResponse.ok) {
                const coursesData = await coursesResponse.json();
                setCourses(coursesData.courses || []);
            }

            // Fetch questions
            const questionsResponse = await fetch('http://127.0.0.1:8000/api/exams/questions/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (questionsResponse.ok) {
                const questionsData = await questionsResponse.json();
                setQuestions(questionsData.questions || []);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            
            // Validate correct answers
            if (questionForm.correct_answers.length === 0) {
                alert('Please select at least one correct answer');
                return;
            }

            const questionData = {
                course_id: questionForm.course_id,
                question_text: questionForm.question_text,
                question_type: questionForm.question_type,
                options: questionForm.options.filter(option => option.trim() !== ''),
                correct_answers: questionForm.correct_answers,
                marks: questionForm.marks,
                difficulty: questionForm.difficulty,
                explanation: questionForm.explanation
            };

            const response = await fetch('http://127.0.0.1:8000/api/exams/questions/create/', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(questionData)
            });

            if (response.ok) {
                setShowAddQuestion(false);
                setQuestionForm({
                    course_id: '',
                    question_text: '',
                    question_type: 'MCQ',
                    options: ['', '', '', ''],
                    correct_answers: [],
                    marks: 1,
                    difficulty: 'medium',
                    explanation: ''
                });
                fetchData();
                alert('Question added successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error adding question: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error adding question:', error);
            alert('Error adding question. Please try again.');
        }
    };

    const handleCSVUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileInput = document.getElementById('csvFile');
        formData.append('csv_file', fileInput.files[0]);
        formData.append('course_id', selectedCourse);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://127.0.0.1:8000/api/exams/questions/upload-csv/', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (response.ok) {
                setShowUploadCSV(false);
                setSelectedCourse('');
                fetchData();
                alert('Questions uploaded successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error uploading CSV: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error uploading CSV:', error);
            alert('Error uploading CSV. Please try again.');
        }
    };

    const handleCorrectAnswerChange = (index) => {
        const newCorrectAnswers = [...questionForm.correct_answers];
        const answerIndex = newCorrectAnswers.indexOf(index);
        
        if (answerIndex > -1) {
            newCorrectAnswers.splice(answerIndex, 1);
        } else {
            newCorrectAnswers.push(index);
        }
        
        setQuestionForm({
            ...questionForm,
            correct_answers: newCorrectAnswers
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Question Management</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => setShowAddQuestion(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add Question
                    </button>
                    <button
                        onClick={() => setShowUploadCSV(true)}
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                    >
                        Upload CSV
                    </button>
                </div>
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">All Questions</h2>
                <div className="space-y-4">
                    {questions.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No questions found</p>
                    ) : (
                        questions.map((question) => (
                            <div key={question.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{question.question_text}</h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Course: {question.course_title} | Type: {question.question_type} | Difficulty: {question.difficulty}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => router.push(`/admin/exams/questions/${question.id}/edit`)}
                                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteQuestion(question.id)}
                                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>Options: {question.options.join(', ')}</p>
                                    <p>Correct Answer: {question.correct_answers.join(', ')}</p>
                                    <p>Marks: {question.marks}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Add Question Modal */}
            {showAddQuestion && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium mb-4">Add New Question</h3>
                            <form onSubmit={handleAddQuestion}>
                                <div className="space-y-4">
                                    <select
                                        value={questionForm.course_id}
                                        onChange={(e) => setQuestionForm({...questionForm, course_id: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.title}</option>
                                        ))}
                                    </select>
                                    <textarea
                                        placeholder="Question Text"
                                        value={questionForm.question_text}
                                        onChange={(e) => setQuestionForm({...questionForm, question_text: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        rows="3"
                                        required
                                    />
                                    <select
                                        value={questionForm.question_type}
                                        onChange={(e) => setQuestionForm({...questionForm, question_type: e.target.value})}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="MCQ">Multiple Choice</option>
                                        <option value="SINGLE">Single Choice</option>
                                        <option value="TRUE_FALSE">True/False</option>
                                    </select>
                                    {questionForm.options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            <input
                                                type="text"
                                                placeholder={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => {
                                                    const newOptions = [...questionForm.options];
                                                    newOptions[index] = e.target.value;
                                                    setQuestionForm({...questionForm, options: newOptions});
                                                }}
                                                className="flex-1 p-2 border rounded"
                                            />
                                            <input
                                                type="checkbox"
                                                checked={questionForm.correct_answers.includes(index)}
                                                onChange={() => handleCorrectAnswerChange(index)}
                                                className="ml-2"
                                            />
                                            <span className="text-sm text-gray-600">Correct</span>
                                        </div>
                                    ))}
                                    <input
                                        type="number"
                                        placeholder="Marks"
                                        value={questionForm.marks}
                                        onChange={(e) => setQuestionForm({...questionForm, marks: parseInt(e.target.value)})}
                                        className="w-full p-2 border rounded"
                                    />
                                    <select
                                        value={questionForm.difficulty}
                                        onChange={(e) => setQuestionForm({...questionForm, difficulty: e.target.value})}
                                        className="w-full p-2 border rounded"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddQuestion(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload CSV Modal */}
            {showUploadCSV && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium mb-4">Upload Questions CSV</h3>
                            <form onSubmit={handleCSVUpload}>
                                <div className="space-y-4">
                                    <select
                                        value={selectedCourse}
                                        onChange={(e) => setSelectedCourse(e.target.value)}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="">Select Course</option>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.title}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="file"
                                        id="csvFile"
                                        accept=".csv"
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <p className="text-sm text-gray-600">
                                        CSV should have columns: question_text, question_type, options, correct_answers, marks, difficulty
                                    </p>
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowUploadCSV(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                                    >
                                        Upload CSV
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



