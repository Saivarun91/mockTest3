import LoginForm from './LoginForm';
import { FaUserGraduate } from 'react-icons/fa';
import AuthLayout from '../components/AuthLayout';

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome Back!"
            description="Sign in to continue your learning journey"
            icon={<FaUserGraduate className="text-indigo-600 text-3xl" />}
        >
            <LoginForm />
        </AuthLayout>
    );
}