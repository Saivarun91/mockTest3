// src/components/ExamHeader.jsx
import { Star, BookOpen, Clock, CheckCircle } from 'lucide-react';

export default function ExamHeader({ exam, isPurchased }) {
    return (
        <div className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        <div className="flex items-center mb-4">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${exam.category === "Cloud Computing" ? "bg-blue-100 text-blue-800" :
                                    exam.category === "Project Management" ? "bg-purple-100 text-purple-800" :
                                        exam.category === "Cyber Security" ? "bg-green-100 text-green-800" :
                                            "bg-gray-100 text-gray-800"
                                }`}>
                                {exam.category}
                            </span>
                            {isPurchased && (
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Purchased
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{exam.title}</h1>
                        <p className="text-gray-600 mb-4">{exam.description}</p>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center text-yellow-600">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="ml-1 font-medium">{exam.rating}</span>
                                <span className="text-gray-500 ml-1">({Math.floor(exam.rating * 1000)} reviews)</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <BookOpen className="w-5 h-5" />
                                <span className="ml-1">{exam.students.toLocaleString()}+ students</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <Clock className="w-5 h-5" />
                                <span className="ml-1">Last updated {exam.lastUpdated}</span>
                            </div>
                        </div>
                    </div>

                    {/* Purchase/Sidebar will be handled in parent component */}
                </div>
            </div>
        </div>
    );
}