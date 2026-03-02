import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck,ShieldBan } from 'lucide-react';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string().email('INVALID FORMAT').required('REQUIRED'),
            password: Yup.string().min(6, 'MIN 6 CHARACTERS').required('REQUIRED'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('https://military-dashboard-backend.onrender.com/login', {
                    email: values.email,
                    password: values.password
                });

                if (response.status === 200 && response.data.access_token) {
                    const payload = {
                        user: {
                            name: values.email.split('@')[0],
                            email: values.email,
                            password: values.password
                        },
                        token: response.data.access_token
                    };

                    dispatch(loginReducer(payload));
                    toast.success('ACCESS GRANTED. WELCOME BACK SOLDIER');
                    navigate('/dashboard');
                }
            }
            catch (error) {
                toast.error(error.response?.data?.detail || 'ACCESS DENIED. INVALID CREDENTIALS.');
                console.error("Login error:", error);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-military-950 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-camo-pattern opacity-5 pointer-events-none"></div>
            <div className="w-full max-w-md bg-military-900 p-8 rounded-sm shadow-2xl border-2 border-military-600 relative z-10">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-900 via-military-500 to-military-900"></div>

                <div className="flex justify-center mb-6">
                    <div className="bg-military-800 p-3 rounded-full border border-military-500">
                        <ShieldBan size={48} className="text-military-300" />
                    </div>
                </div>

                <h2 className="text-3xl font-stencil text-center text-military-100 mb-2 tracking-widest uppercase">Restricted Access</h2>
                <p className="text-center text-military-500 mb-8 font-mono text-xs uppercase tracking-widest">Authorized Personnel Only</p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-mono text-military-400 uppercase ml-1">Identification (Email)</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">{formik.errors.email}</p>}
                    </div>
                    <div>
                        <label className="text-xs font-mono text-military-400 uppercase ml-1">Access Code (Password)</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full p-3 bg-military-950 border border-military-700 text-military-100 focus:border-military-400 focus:outline-none font-mono"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-mono uppercase">{formik.errors.password}</p>}
                    </div>
                    <button type="submit" className="w-full py-3 bg-military-700 hover:bg-military-600 text-military-50 font-bold border border-military-500 transition-all font-stencil tracking-widest uppercase shadow-[0_0_10px_rgba(75,83,32,0.5)]">
                        Authenticate
                    </button>
                </form>
                <p className="text-center mt-6 text-military-500 text-xs font-mono">
                    UNREGISTERED UNIT? <Link to="/register" className="text-military-300 font-bold hover:text-military-100 uppercase underline decoration-military-500">ENLIST HERE</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
