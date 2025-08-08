// app/mentor/dashboard/layout.jsx
import Link from 'next/link';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export default function MentorDashboardLayout({ children }) {
    const tabs = [
        { name: 'Dashboard', href: '/mentor/dashboard', icon: '📊' },
        { name: 'Profile', href: '/mentor/dashboard/profile', icon: '👤' },
        { name: 'Courses', href: '/mentor/dashboard/courses', icon: '📚' },
        { name: 'Messages', href: '/mentor/dashboard/conversations', icon: '💬' },
        { name: 'Settings', href: '/mentor/dashboard/settings', icon: '⚙️' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                <AcademicCapIcon className="h-6 w-6" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Exam<span className="text-blue-600">Questions</span>
                            </span>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <div className="hidden md:flex items-center space-x-1 bg-blue-50 px-3 py-1 rounded-full">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm text-blue-800">Online</span>
                            </div>
                            <button className="p-1 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-medium">
                                    M
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
                            <div className="space-y-1">
                                {tabs.map((tab) => (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        className="flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                                    >
                                        <span className="text-lg mr-3 group-hover:scale-110 transition-transform">
                                            {tab.icon}
                                        </span>
                                        {tab.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <button className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <span className="text-lg mr-3">🚪</span>
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Mentor Stats Card */}
                        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-5 text-white">
                            <h3 className="text-sm font-medium mb-3">Your Impact</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-2xl font-bold">142</p>
                                    <p className="text-xs opacity-80">Students Helped</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">96%</p>
                                    <p className="text-xs opacity-80">Satisfaction Rate</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">4.9★</p>
                                    <p className="text-xs opacity-80">Average Rating</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}