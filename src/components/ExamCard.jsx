// src/components/ExamCard.jsx
import Link from 'next/link';
import { Star, Clock } from 'lucide-react';

export default function ExamCard({ exam }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${exam.category === "Cloud Computing" ? "bg-blue-100 text-blue-800" :
                            exam.category === "Data Science" ? "bg-orange-100 text-orange-800" :
                                exam.category === "Security" ? "bg-green-100 text-green-800" :
                                    "bg-gray-100 text-gray-800"
                        }`}>
                        {exam.category}
                    </span>
                    <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-gray-700 text-sm">{exam.popularity}%</span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">{exam.title}</h3>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{exam.duration} • {exam.questions} Questions</span>
                </div>

                <Link
                    href={`/exams/${exam.slug}`}
                    className={`block w-full text-center px-4 py-2 rounded-lg font-medium transition-colors ${exam.premium
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                >
                    {exam.premium ? "Premium Content" : "Start Practice"}
                </Link>
            </div>
        </div>
    );
}