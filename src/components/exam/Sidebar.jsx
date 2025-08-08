// src/components/exam/Sidebar.jsx
import { Clock, BookOpen, Award, Star, MessageSquare } from 'lucide-react';

export default function Sidebar({ exam, isPurchased, setShowPaymentModal, selectedPlan, setSelectedPlan }) {
    return (
        <div className="md:w-1/3 space-y-6">
            {/* Exam Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Exam Details</h3>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                            <div className="text-sm text-gray-500">Duration</div>
                            <div className="font-medium">{exam.duration}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                            <div className="text-sm text-gray-500">Questions</div>
                            <div className="font-medium">{exam.questions} practice questions</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Award className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                            <div className="text-sm text-gray-500">Difficulty</div>
                            <div className="font-medium">{exam.difficulty}</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Star className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                            <div className="text-sm text-gray-500">Rating</div>
                            <div className="font-medium">{exam.rating}/5 ({Math.floor(exam.rating * 1000)} reviews)</div>
                        </div>
                    </div>
                </div>

                {!isPurchased && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Ready to get certified?</h3>
                        <button
                            onClick={() => setShowPaymentModal(true)}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium shadow-md mb-2"
                        >
                            Enroll Now
                        </button>
                        <p className="text-xs text-gray-500 text-center">30-day money-back guarantee</p>
                    </div>
                )}
            </div>

            {/* Mentor Support Card */}
            {isPurchased && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Need help?</h3>
                    <p className="text-gray-600 mb-4">Get personalized support from our certified mentors.</p>
                    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Ask a Mentor
                    </button>
                </div>
            )}
        </div>
    );
}