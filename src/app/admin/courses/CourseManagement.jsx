'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CourseManagement() {
    const [courses, setCourses] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [showUploadCSV, setShowUploadCSV] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const router = useRouter();

    const [courseForm, setCourseForm] = useState({
        slug: '',
        title: '',
        description: '',
        category: '',
        price: '',
        duration: '',
        questions: '',
        features: []
    });

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
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('http://127.0.0.1:8000/api/courses/');
            const data = await response.json();
            console.log("Fetched courses:", data);
            setCourses(data.courses || []);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('adminToken');
            
            // Generate slug from title
            const slug = courseForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            
            const courseData = {
                slug: slug,
                title: courseForm.title,
                description: courseForm.description || '',
                category: courseForm.category,
                price: parseFloat(courseForm.price),
                duration: courseForm.duration || '',
                questions: courseForm.questions || '',
                features: courseForm.features || [],
                new: true,
                lastUpdated: new Date().toISOString()
            };

            const response = await fetch('http://127.0.0.1:8000/api/courses/create/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(courseData)
            });

            if (response.ok) {
                setShowAddCourse(false);
                setCourseForm({
                    slug: '',
                    title: '',
                    description: '',
                    category: '',
                    price: '',
                    duration: '',
                    questions: '',
                    features: []
                });
                fetchCourses();
                alert('Course created successfully!');
            } else {
                const errorData = await response.json();
                alert(`Error creating course: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error adding course:', error);
            alert('Error creating course. Please try again.');
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
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
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                setShowUploadCSV(false);
                setSelectedCourse(null);
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

    const handleDeleteCourse = async (courseId) => {
        if (confirm('Are you sure you want to delete this course?')) {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await fetch(`http://127.0.0.1:8000/api/courses/delete/${courseId}/`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    fetchCourses();
                    alert('Course deleted successfully!');
                } else {
                    const errorData = await response.json();
                    alert(`Error deleting course: ${errorData.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Error deleting course:', error);
                alert('Error deleting course. Please try again.');
            }
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
                <h1 className="text-3xl font-bold">Course Management</h1>
                <div className="space-x-4">
                    <button
                        onClick={() => setShowAddCourse(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Course
                    </button>
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

            {/* Courses List */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">All Courses</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Course
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Students
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                                            <div className="text-sm text-gray-500">{course.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {course.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ₹{course.price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {course.enrolled_count || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => router.push(`/admin/courses/${course.id}/edit`)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Course Modal */}
            {showAddCourse && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium mb-4">Add New Course</h3>
                            <form onSubmit={handleAddCourse}>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Course Title"
                                        value={courseForm.title}
                                        onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={courseForm.description}
                                        onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        rows="3"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Number of Questions"
                                        value={courseForm.questions}
                                        onChange={(e) => setCourseForm({...courseForm, questions: e.target.value})}
                                        className="w-full p-2 border rounded"
                                    />
                                    
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={courseForm.category}
                                        onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Price"
                                        value={courseForm.price}
                                        onChange={(e) => setCourseForm({...courseForm, price: e.target.value})}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Duration"
                                        value={courseForm.duration}
                                        onChange={(e) => setCourseForm({...courseForm, duration: e.target.value})}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCourse(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Add Course
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

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