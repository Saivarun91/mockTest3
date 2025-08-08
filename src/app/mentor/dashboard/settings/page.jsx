// app/mentor/dashboard/settings/page.jsx
'use client';
// app/mentor/dashboard/settings/page.jsx
import { useState } from 'react';
import { FiToggleLeft, FiToggleRight, FiBell, FiMail, FiTrash2, FiLink } from 'react-icons/fi';

export default function SettingsPage() {
    const [isAvailable, setIsAvailable] = useState(true);
    const [notificationPref, setNotificationPref] = useState({
        email: true,
        inApp: true
    });
    const [supportLink, setSupportLink] = useState('https://example.com/support');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

            <div className="space-y-8">
                {/* Availability */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium text-gray-800">Online Status</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                {isAvailable ? 'You appear as available to students' : 'You appear as unavailable to students'}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAvailable(!isAvailable)}
                            className="relative inline-flex items-center"
                        >
                            {isAvailable ? (
                                <FiToggleRight className="text-blue-600" size={40} />
                            ) : (
                                <FiToggleLeft className="text-gray-400" size={40} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FiMail className="text-gray-600 mr-3" />
                                <div>
                                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotificationPref({ ...notificationPref, email: !notificationPref.email })}
                                className="relative inline-flex items-center"
                            >
                                {notificationPref.email ? (
                                    <FiToggleRight className="text-blue-600" size={40} />
                                ) : (
                                    <FiToggleLeft className="text-gray-400" size={40} />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FiBell className="text-gray-600 mr-3" />
                                <div>
                                    <h3 className="font-medium text-gray-800">In-App Notifications</h3>
                                    <p className="text-sm text-gray-500">Receive notifications in the app</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotificationPref({ ...notificationPref, inApp: !notificationPref.inApp })}
                                className="relative inline-flex items-center"
                            >
                                {notificationPref.inApp ? (
                                    <FiToggleRight className="text-blue-600" size={40} />
                                ) : (
                                    <FiToggleLeft className="text-gray-400" size={40} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="supportLink" className="block text-sm font-medium text-gray-700 mb-1">
                                Support Link
                            </label>
                            <div className="flex rounded-md shadow-sm">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                                    <FiLink className="text-gray-400" />
                                </span>
                                <input
                                    type="text"
                                    id="supportLink"
                                    value={supportLink}
                                    onChange={(e) => setSupportLink(e.target.value)}
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                This link will be shared with students who need additional support
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Actions */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>

                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <div className="flex items-center">
                                <FiTrash2 className="mr-3" />
                                <span>Delete Account</span>
                            </div>
                            <span className="text-sm text-red-400">Permanent action</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}