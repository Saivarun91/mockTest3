export default function StatsCard({ title, value, change, icon, color }) {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                    <p className={`text-sm mt-2 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
                    </p>
                </div>
                <div className={`p-3 rounded-full ${color} bg-opacity-10`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}