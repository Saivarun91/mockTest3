import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function SocialAuthButtons() {
    const buttons = [
        { icon: <FaGoogle className="h-5 w-5 text-red-600" />, color: 'hover:bg-red-50' },
        { icon: <FaFacebook className="h-5 w-5 text-blue-600" />, color: 'hover:bg-blue-50' },
        { icon: <FaApple className="h-5 w-5 text-gray-900" />, color: 'hover:bg-gray-50' }
    ];

    return (
        <div className="mt-6 grid grid-cols-3 gap-3">
            {buttons.map((button, index) => (
                <motion.button
                    key={index}
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 transition-colors ${button.color}`}
                >
                    {button.icon}
                </motion.button>
            ))}
        </div>
    );
}