import DataTable from '../components/DataTable';

const mentors = [
    { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah@example.com', expertise: 'Mathematics', status: 'Active' },
    { id: 2, name: 'Prof. Michael Chen', email: 'michael@example.com', expertise: 'Physics', status: 'Active' },
    { id: 3, name: 'Dr. Emily Wilson', email: 'emily@example.com', expertise: 'Chemistry', status: 'On Leave' },
    // More mentors...
];

const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Expertise', accessor: 'expertise' },
    { header: 'Status', accessor: 'status' },
    { header: 'Actions', accessor: 'actions' },
];

export default function Mentors() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mentors Management</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add New Mentor
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div className="relative w-64">
                        <input
                            type="text"
                            placeholder="Search mentors..."
                            className="block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="flex space-x-2">
                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Filter by Expertise</option>
                            <option>Mathematics</option>
                            <option>Physics</option>
                            <option>Chemistry</option>
                        </select>
                        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Filter by Status</option>
                            <option>Active</option>
                            <option>On Leave</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                <DataTable data={mentors} columns={columns} />
            </div>
        </div>
    );
}