// app/mentor/dashboard/page.jsx
import { FiMessageSquare, FiUsers, FiClock, FiStar } from 'react-icons/fi';

export default function DashboardPage() {
    // Mock data - would come from backend
    const stats = [
        { title: "Active Conversations", value: 12, icon: <FiMessageSquare className="text-blue-600" size={24} />, change: "+3", trend: 'up' },
        { title: "Students Helped", value: 84, icon: <FiUsers className="text-indigo-600" size={24} />, change: "+12", trend: 'up' },
        { title: "Avg. Response Time", value: "32m", icon: <FiClock className="text-purple-600" size={24} />, change: "-5m", trend: 'down' },
        { title: "Mentor Rating", value: "4.8/5", icon: <FiStar className="text-yellow-600" size={24} />, change: "+0.2", trend: 'up' }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                                {stat.icon}
                            </div>
                        </div>
                        <div className={`mt-3 text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change} from last week
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
                </div>
                <div className="divide-y divide-gray-200">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-900">Calculus: Integration Techniques</h3>
                                    <p className="text-gray-600 mt-1">Student: Sarah Johnson</p>
                                    <p className="text-sm text-gray-500 mt-2">"Can you explain how to solve this integral problem step by step?"</p>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-500">2 hours ago</span>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                                        Respond
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}