'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function StudentDashboard() {
    const [user, setUser] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                router.push('/auth/login');
                return;
            }

            // Fetch user profile
            const userResponse = await axios.get('/api/auth/profile/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUser(userResponse.data);

            // Fetch enrolled courses
            const enrollmentsResponse = await axios.get('/api/bookings/enrollments/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setEnrolledCourses(enrollmentsResponse.data.enrollments || []);

            // Fetch available courses
            const coursesResponse = await axios.get('/api/courses/');
            setAvailableCourses(coursesResponse.data.courses || []);

            // Fetch test results
            const resultsResponse = await axios.get('/api/exams/results/', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setTestResults(resultsResponse.data.results || []);

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnrollCourse = (courseId) => {
        router.push(`/my_profile/enroll/${courseId}`);
    };

    const handleStartTest = (examId) => {
        router.push(`/my_profile/test/${examId}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600 mt-2">Track your progress and manage your courses</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Enrolled Courses</p>
                                <p className="text-2xl font-semibold text-gray-900">{enrolledCourses.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Tests Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">{testResults.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Average Score</p>
                                <p className="text-2xl font-semibold text-gray-900">
                                    {testResults.length > 0 
                                        ? Math.round(testResults.reduce((acc, result) => acc + result.percentage, 0) / testResults.length)
                                        : 0}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Enrolled Courses */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">My Enrolled Courses</h2>
                        </div>
                        <div className="p-6">
                            {enrolledCourses.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No courses enrolled yet</p>
                            ) : (
                                <div className="space-y-4">
                                    {enrolledCourses.map((enrollment) => (
                                        <div key={enrollment.course_id} className="border rounded-lg p-4">
                                            <h3 className="font-semibold text-gray-900">{enrollment.course_title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Enrolled: {new Date(enrollment.enrolled_at).toLocaleDateString()}
                                            </p>
                                            <div className="mt-3 flex space-x-2">
                                                <button
                                                    onClick={() => router.push(`/my_profile/course/${enrollment.course_id}`)}
                                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                                                >
                                                    View Course
                                                </button>
                                                <button
                                                    onClick={() => router.push(`/my_profile/course/${enrollment.course_id}/tests`)}
                                                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                                                >
                                                    Take Test
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Available Courses */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Available Courses</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {availableCourses.map((course) => (
                                    <div key={course.id} className="border rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                                        <div className="mt-2 flex justify-between items-center">
                                            <span className="text-lg font-bold text-green-600">₹{course.price}</span>
                                            <button
                                                onClick={() => handleEnrollCourse(course.id)}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Test Results */}
                <div className="mt-8 bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Test Results</h2>
                    </div>
                    <div className="p-6">
                        {testResults.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No test results yet</p>
                        ) : (
                            <div className="space-y-4">
                                {testResults.slice(0, 5).map((result) => (
                                    <div key={result.id} className="border rounded-lg p-4">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{result.exam_title}</h3>
                                                <p className="text-sm text-gray-600">{result.course_title}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-blue-600">{result.percentage}%</p>
                                                <p className={`text-sm ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                                                    {result.passed ? 'PASSED' : 'FAILED'}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Completed: {new Date(result.completed_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 