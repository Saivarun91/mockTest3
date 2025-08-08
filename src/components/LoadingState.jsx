// src/components/LoadingState.jsx
export default function LoadingState() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-pulse text-center">
                <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
                <div className="text-blue-600 font-medium">Loading exam details...</div>
            </div>
        </div>
    );
}