// src/components/NotFoundState.jsx
import Link from 'next/link';

export default function NotFoundState() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <div className="text-4xl font-bold text-gray-700 mb-4">404</div>
                <p className="text-gray-600 mb-6">Exam not found</p>
                <Link
                    href="/exams"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Browse All Exams
                </Link>
            </div>
        </div>
    );
}