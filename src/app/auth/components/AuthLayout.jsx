'use client';
import { motion } from 'framer-motion';

export default function AuthLayout({ children, title, description, icon }) {
    // Enhanced Unsplash background images with education theme
    const backgrounds = [
        'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80', // Education
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', // Graduation
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80' // Students
    ];

    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Left Side - Enhanced Branding/Illustration */}
                    <div
                        className="hidden md:block md:w-2/5 relative p-8 text-white"
                        style={{
                            backgroundImage: `linear-gradient(135deg, rgba(79, 70, 229, 0.9), rgba(99, 102, 241, 0.9)), url(${randomBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 to-indigo-900/10" />
                        <div className="h-full flex flex-col justify-center relative z-10">
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
                            >
                                {icon}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl font-bold text-center mb-4 text-white drop-shadow-md"
                            >
                                {title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-indigo-100 text-center text-lg mb-8 max-w-md mx-auto"
                            >
                                {description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 space-y-6"
                            >
                                <div className="flex items-center justify-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Trusted by 50,000+ students</p>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-yellow-300 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-indigo-200 italic">"This platform transformed my learning experience!"</p>
                                    <p className="text-white font-medium mt-1">- Sarah, Computer Science Student</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side - Form Content */}
                    <div className="w-full md:w-3/5 p-8 md:p-12">
                        {/* Mobile Header */}
                        <div className="md:hidden text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                                {icon}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                {title}
                            </h2>
                            <p className="text-gray-600">
                                {description}
                            </p>
                        </div>

                        {children}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}