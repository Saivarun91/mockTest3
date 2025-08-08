'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

export default function CourseEnrollment() {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const params = useParams();
    const courseId = params.courseId;

    useEffect(() => {
        fetchCourseDetails();
    }, [courseId]);

    const fetchCourseDetails = async () => {
        try {
            const response = await axios.get(`/api/courses/${courseId}/`);
            setCourse(response.data.data);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setError('Failed to load course details');
        } finally {
            setLoading(false);
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve();
            document.body.appendChild(script);
        });
    };

    const handleEnrollment = async () => {
        setPaymentLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                setError('Please login to continue');
                return;
            }

            // Create payment order
            const orderResponse = await axios.post('/api/bookings/create-order/', {
                course_id: courseId
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!orderResponse.data.success) {
                setError(orderResponse.data.message || 'Failed to create payment order');
                return;
            }

            // Load Razorpay script
            await loadRazorpayScript();

            // Initialize Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: orderResponse.data.amount,
                currency: orderResponse.data.currency,
                name: 'Mock Test Platform',
                description: `Enrollment for ${course.title}`,
                order_id: orderResponse.data.order_id,
                handler: async function (response) {
                    try {
                        // Verify payment
                        const verifyResponse = await axios.post('/api/bookings/verify/', {
                            payment_id: orderResponse.data.payment_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            razorpay_order_id: orderResponse.data.order_id
                        }, {
                            headers: { 'Authorization': `Bearer ${token}` }
                        });

                        if (verifyResponse.data.success) {
                            router.push('/my_profile?enrolled=true');
                        } else {
                            setError(verifyResponse.data.message || 'Payment verification failed');
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
            console.error('Payment error:', error);
            setError('Failed to initiate payment');
        } finally {
            setPaymentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
                    <button
                        onClick={() => router.push('/my_profile')}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                        <p className="text-blue-100">{course.description}</p>
                    </div>

                    <div className="p-6">
                        {/* Course Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Course Information</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Category:</span>
                                        <span className="font-medium">{course.category}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Duration:</span>
                                        <span className="font-medium">{course.duration}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Questions:</span>
                                        <span className="font-medium">{course.questions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Rating:</span>
                                        <span className="font-medium">{course.avgRating || 0}/5 ({course.ratingCount || 0} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Course Features</h2>
                                <ul className="space-y-2">
                                    {course.features && course.features.map((feature, index) => (
                                        <li key={index} className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">₹{course.price}</h3>
                                    <p className="text-gray-600">One-time payment</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600">Lifetime access</p>
                                    <p className="text-sm text-gray-600">Certificate included</p>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-4">
                            <button
                                onClick={() => router.push('/my_profile')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                Back to Dashboard
                            </button>
                            <button
                                onClick={handleEnrollment}
                                disabled={paymentLoading}
                                className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {paymentLoading ? 'Processing...' : 'Enroll Now'}
                            </button>
                        </div>

                        {/* Security Notice */}
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-sm text-blue-700">
                                    Your payment is secured by Razorpay. We use industry-standard encryption to protect your data.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 