'use client';
import { useState } from 'react';

export default function Settings() {
    const [formData, setFormData] = useState({
        siteName: 'ExamPortal',
        siteLogo: '',
        timezone: 'UTC',
        maintenanceMode: false,
        emailNotifications: true,
        resultPublication: 'immediate',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Save settings logic here
        alert('Settings saved successfully!');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">System Settings</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Site Name
                                </label>
                                <input
                                    type="text"
                                    id="siteName"
                                    name="siteName"
                                    value={formData.siteName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Timezone
                                </label>
                                <select
                                    id="timezone"
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="UTC">UTC</option>
                                    <option value="EST">Eastern Time (EST)</option>
                                    <option value="PST">Pacific Time (PST)</option>
                                    <option value="GMT">GMT</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="siteLogo" className="block text-sm font-medium text-gray-700 mb-1">
                                    Site Logo
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="file"
                                        id="siteLogo"
                                        name="siteLogo"
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="resultPublication" className="block text-sm font-medium text-gray-700 mb-1">
                                    Result Publication
                                </label>
                                <select
                                    id="resultPublication"
                                    name="resultPublication"
                                    value={formData.resultPublication}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="immediate">Immediately after exam</option>
                                    <option value="manual">Manual publication</option>
                                    <option value="scheduled">Scheduled publication</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="maintenanceMode"
                                    name="maintenanceMode"
                                    checked={formData.maintenanceMode}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="maintenanceMode" className="ml-2 block text-sm text-gray-700">
                                    Maintenance Mode
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="emailNotifications"
                                    name="emailNotifications"
                                    checked={formData.emailNotifications}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                                    Enable Email Notifications
                                </label>
                            </div>
                        </div>

                        <div className="pt-5">
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h4 className="text-md font-medium text-gray-900">Reset All Data</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                This will permanently delete all exam data, student records, and other information.
                            </p>
                        </div>
                        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Reset Data
                        </button>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div>
                            <h4 className="text-md font-medium text-gray-900">Delete Account</h4>
                            <p className="text-sm text-gray-500 mt-1">
                                Permanently delete your admin account and all associated data.
                            </p>
                        </div>
                        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}