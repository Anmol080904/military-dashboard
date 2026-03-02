import React from 'react';
import { ShieldAlert, LogOut, Crosshair, Menu ,ShieldCheck} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { logoutReducer } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Navbar = ({ onToggleSidebar }) => {
    const { toggleTheme } = useTheme();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutReducer());
        toast.success("Signed out. Report to barracks.");
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b-4 border-military-700 bg-military-900 px-4 py-3 shadow-xl">
            <div className="flex items-center justify-between mx-auto max-w-7xl">

                <div className="flex items-center gap-2">
                    <button
                        onClick={onToggleSidebar}
                        className="md:hidden p-1.5 text-military-400 hover:text-military-100 transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-military-600 p-1.5 rounded-sm text-military-50 border border-military-400 group-hover:bg-military-500 transition-colors">
                            <ShieldCheck size={24} />
                        </div>
                        <span className="text-xl md:text-2xl font-stencil tracking-widest text-military-100 uppercase overflow-hidden whitespace-nowrap text-ellipsis">
                            Brigade<span className="text-military-400"> Manager</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:gap-6">
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="hidden md:flex items-center gap-2 text-sm font-mono text-military-300 uppercase border border-military-700 px-3 py-1 bg-military-950">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                UserName: {user?.name || 'OPERATIVE'}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 text-xs md:text-sm font-bold text-red-400 hover:bg-military-800 border border-transparent hover:border-red-900 transition-colors font-stencil tracking-wider uppercase"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Abort Session</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link
                                to="/login"
                                className="px-2 md:px-4 py-1.5 text-xs md:text-sm font-bold text-military-300 hover:text-military-100 transition-colors font-stencil tracking-wider uppercase"
                            >
                                Identify
                            </Link>
                            <Link
                                to="/register"
                                className="px-2 md:px-4 py-1.5 text-xs md:text-sm font-bold bg-military-600 text-white hover:bg-military-500 transition-all shadow-lg shadow-black/50 border border-military-400 font-stencil tracking-wider uppercase"
                            >
                                Enlist
                            </Link>
                        </div>
                    )}

                    <div className="w-px h-6 bg-military-700 mx-1"></div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 text-military-400 hover:text-yellow-500 transition-all hover:rotate-90"
                    >
                        <Crosshair size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
