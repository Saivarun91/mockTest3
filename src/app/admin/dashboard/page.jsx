import StatsCard from '../components/StatsCard';
import { FiUsers, FiBook, FiUser, FiFileText } from 'react-icons/fi';
// import RecentActivity from '../components/RecentActivity';
// import ExamStatsChart from '../components/ExamStatsChart';

export default function Dashboard() {
    const stats = [
        {
            title: 'Total Students',
            value: '1,254',
            change: 12,
            icon: <FiUsers size={24} className="text-blue-500" />,
            color: 'bg-blue-100'
        },
        {
            title: 'Active Courses',
            value: '48',
            change: 5,
            icon: <FiBook size={24} className="text-green-500" />,
            color: 'bg-green-100'
        },
        {
            title: 'Mentors',
            value: '32',
            change: -2,
            icon: <FiUser size={24} className="text-purple-500" />,
            color: 'bg-purple-100'
        },
        {
            title: 'Exams Conducted',
            value: '1,024',
            change: 18,
            icon: <FiFileText size={24} className="text-orange-500" />,
            color: 'bg-orange-100'
        }
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Exam Statistics</h2>
                    {/* <div className="h-80">
                        <ExamStatsChart />
                    </div> */}
                </div>

                {/* <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                    <RecentActivity />
                </div> */}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="bg-blue-50 text-blue-600 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                        Create New Exam
                    </button>
                    <button className="bg-green-50 text-green-600 p-4 rounded-lg hover:bg-green-100 transition-colors duration-200">
                        Add Student
                    </button>
                    <button className="bg-purple-50 text-purple-600 p-4 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                        Assign Mentor
                    </button>
                    <button className="bg-orange-50 text-orange-600 p-4 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                        Generate Reports
                    </button>
                </div>
            </div>
        </div>
    );
}