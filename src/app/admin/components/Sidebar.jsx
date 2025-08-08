'use client';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const navigation = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: '📊',
            current: pathname === '/admin/dashboard'
        },
        {
            name: 'Courses',
            href: '/admin/courses',
            icon: '📚',
            current: pathname === '/admin/courses'
        },
        {
            name: 'Questions',
            href: '/admin/exams',
            icon: '❓',
            current: pathname === '/admin/exams'
        },
        {
            name: 'Students',
            href: '/admin/students',
            icon: '👥',
            current: pathname === '/admin/students'
        },
        {
            name: 'Settings',
            href: '/admin/settings',
            icon: '⚙️',
            current: pathname === '/admin/settings'
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        router.push('/auth/login');
    };

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!isCollapsed && (
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded hover:bg-gray-700"
                >
                    {isCollapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="mt-8">
                <ul className="space-y-2">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => router.push(item.href)}
                                className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                                    item.current
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <span className="text-xl mr-3">{item.icon}</span>
                                {!isCollapsed && (
                                    <span className="font-medium">{item.name}</span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                    <span className="text-xl mr-3">🚪</span>
                    {!isCollapsed && (
                        <span className="font-medium">Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
}