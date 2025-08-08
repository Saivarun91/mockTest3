// app/mentor/dashboard/courses/page.jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AcademicCapIcon, UsersIcon, ChartBarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from 'lucide-react';

const courses = [
    {
        id: '1',
        title: 'Advanced Calculus',
        category: 'Mathematics',
        students: 24,
        progress: 82,
        studentsList: [
            { id: '101', name: 'Alice Johnson', email: 'alice@example.com', progress: 92 },
            { id: '102', name: 'Bob Smith', email: 'bob@example.com', progress: 78 },
            { id: '103', name: 'Charlie Brown', email: 'charlie@example.com', progress: 65 },
        ],
    },
    {
        id: '2',
        title: 'Linear Algebra Fundamentals',
        category: 'Mathematics',
        students: 18,
        progress: 75,
        studentsList: [
            { id: '104', name: 'David Wilson', email: 'david@example.com', progress: 88 },
            { id: '105', name: 'Eva Green', email: 'eva@example.com', progress: 62 },
        ],
    },
];

export default function CoursesTab() {
    const [expandedCourse, setExpandedCourse] = useState(null);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Courses</h2>
                <div className="bg-blue-50 px-4 py-2 rounded-full text-blue-800 text-sm font-medium">
                    Total: {courses.length} courses • {courses.reduce((sum, course) => sum + course.students, 0)} students
                </div>
            </div>

            <div className="space-y-6">
                {courses.map((course) => (
                    <div key={course.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                                    <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                        {course.category}
                                    </span>
                                </div>
                                <Link
                                    href={`/courses/${course.id}`}
                                    className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-1" />
                                    View Course
                                </Link>
                            </div>

                            <div className="mt-4 flex items-center space-x-4">
                                <div className="flex items-center text-sm text-gray-600">
                                    <UsersIcon className="h-4 w-4 mr-1" />
                                    {course.students} students
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <ChartBarIcon className="h-4 w-4 mr-1" />
                                    Average progress: {course.progress}%
                                </div>
                            </div>

                            <button
                                onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                                className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            >
                                {expandedCourse === course.id ? 'Hide students' : 'Show students'}
                                <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        {expandedCourse === course.id && (
                            <div className="border-t border-gray-200 bg-gray-50 p-6">
                                <h4 className="text-sm font-medium text-gray-700 mb-4">Students in this course</h4>
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th scope="col" className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Progress
                                                </th>
                                                <th scope="col" className="relative py-3 pl-3 pr-4">
                                                    <span className="sr-only">Message</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {course.studentsList.map((student) => (
                                                <tr key={student.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                                                        {student.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{student.email}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${student.progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-xs mt-1">{student.progress}%</span>
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                                                        <Link
                                                            href={`/mentor/dashboard/conversations?student=${student.id}`}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Message
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}