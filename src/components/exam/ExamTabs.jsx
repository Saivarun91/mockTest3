// src/components/ExamTabs.jsx
export default function ExamTabs({ activeTab, setActiveTab }) {
    const tabs = ['overview', 'syllabus', 'instructor', 'reviews', 'faqs'];

    return (
        <div className="container mx-auto px-4 border-b border-gray-200">
            <nav className="flex space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </nav>
        </div>
    );
}