// src/components/exam/ExamTabContent.jsx
import { CheckCircle, Star } from 'lucide-react';

export function OverviewTab({ exam }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Certification</h2>
            <div className="prose max-w-none text-gray-600">
                <p>{exam.description}</p>

                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                    {exam.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Exam Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Format</div>
                        <div className="font-medium">Multiple choice, multiple response</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{exam.duration}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Questions</div>
                        <div className="font-medium">{exam.questions} (practice bank)</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-500">Passing Score</div>
                        <div className="font-medium">720/1000 (72%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SyllabusTab({ exam }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Syllabus</h2>
            <div className="space-y-4">
                {exam.syllabus.map((week, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full flex justify-between items-center p-4 bg-gray-50">
                            <h3 className="font-medium text-left">Week {week.week}: {week.title}</h3>
                        </div>
                        <div className="p-4 border-t border-gray-200">
                            <ul className="space-y-2">
                                {week.topics.map((topic, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function InstructorTab({ exam }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">About the Instructor</h2>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-bold">
                        {exam.instructor.name.charAt(0)}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{exam.instructor.name}</h3>
                    <p className="text-gray-600 mb-3">{exam.instructor.role} • {exam.instructor.experience} experience</p>
                    <p className="text-gray-600 mb-4">
                        With over {exam.instructor.students.toLocaleString()} students taught, {exam.instructor.name.split(' ')[0]} brings real-world expertise.
                    </p>
                    <div className="flex items-center text-gray-600">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-medium">4.9</span>
                        <span className="mx-1">•</span>
                        <span>{Math.floor(exam.instructor.students / 1000)}k+ Reviews</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ReviewsTab() {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Student Reviews</h2>
            <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                            <div>
                                <h4 className="font-medium">Student {review}</h4>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-2">
                            "This course prepared me perfectly for the exam. The practice questions were very similar to the real thing."
                        </p>
                        <div className="text-sm text-gray-500">Completed on {new Date().toLocaleDateString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function FaqsTab({ exam }) {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {exam.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">{faq.question}</h3>
                        <p className="text-gray-600 mt-2">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}