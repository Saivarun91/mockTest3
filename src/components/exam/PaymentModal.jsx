// src/components/exam/PaymentModal.jsx
import { CheckCircle } from 'lucide-react';

export default function PaymentModal({ exam, selectedPlan, setShowPaymentModal }) {
    const currentPlan = exam.plans.find(p => p.id === selectedPlan);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Complete Your Enrollment</h3>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Selected Plan</h4>
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium">{currentPlan.name} Plan</div>
                                    <div className="text-sm text-gray-600">{currentPlan.duration} access</div>
                                </div>
                                <div className="text-lg font-bold">${currentPlan.price}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Plan Features</h4>
                        <ul className="space-y-2">
                            {currentPlan.features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment form would go here */}
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                        <div className="text-center py-8 text-gray-500">
                            Payment gateway integration would appear here
                        </div>
                    </div>

                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium shadow-md mb-3"
                        onClick={() => setShowPaymentModal(false)}
                    >
                        Complete Payment
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                        By completing your purchase you agree to our Terms of Service
                    </p>
                </div>
            </div>
        </div>
    );
}