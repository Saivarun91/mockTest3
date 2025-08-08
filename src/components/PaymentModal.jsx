'use client';
import { useState, useEffect } from 'react';

export default function PaymentModal({ course, isOpen, onClose, onSuccess }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadRazorpayScript();
        }
    }, [isOpen]);

    const loadRazorpayScript = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
            console.log('Razorpay script loaded');
        };
        document.body.appendChild(script);
    };

    const handlePayment = async () => {
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setError('Please login to continue');
                setLoading(false);
                return;
            }

            // Create payment order
            const orderResponse = await fetch('/api/bookings/create-order/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    course_id: course.id
                })
            });

            const orderData = await orderResponse.json();

            if (!orderData.success) {
                setError(orderData.message || 'Failed to create payment order');
                setLoading(false);
                return;
            }

            // Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Mock Test Platform',
                description: `Enrollment for ${course.title}`,
                order_id: orderData.order_id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyResponse = await fetch('/api/bookings/verify/', {
                            method: 'POST',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                payment_id: orderData.payment_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                razorpay_order_id: orderData.order_id
                            })
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            onSuccess();
                            onClose();
                        } else {
                            setError(verifyData.message || 'Payment verification failed');
                        }
                    } catch (error) {
                        setError('Payment verification failed');
                    }
                },
                prefill: {
                    name: 'Student Name',
                    email: 'student@example.com'
                },
                theme: {
                    color: '#3B82F6'
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            setError('Failed to initiate payment');
            console.error('Payment error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">Enroll in Course</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-semibold text-lg mb-2">{course.title}</h4>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Course Price:</span>
                                <span className="font-semibold text-lg">₹{course.price}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Duration:</span>
                                <span>{course.duration}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Questions:</span>
                                <span>{course.questions}</span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePayment}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Pay Now'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 