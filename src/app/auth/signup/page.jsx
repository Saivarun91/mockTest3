import SignupForm from './SignupForm';
import { FaChalkboardTeacher } from 'react-icons/fa';
import AuthLayout from '../components/AuthLayout';

export default function SignupPage() {
    return (
        <AuthLayout
            title="Join Us Today"
            description="Create an account to start learning"
            icon={<FaChalkboardTeacher className="text-indigo-600 text-3xl" />}
        >
            <SignupForm />
        </AuthLayout>
    );
}