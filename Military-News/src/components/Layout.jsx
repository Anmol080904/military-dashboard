import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
    const { isDarkMode } = useTheme();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    return (
        <div className={`min-h-screen flex flex-col bg-military-900 text-military-50 font-mono relative`}>
            <Navbar onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
            <Header />

            <div className="flex flex-1 relative">
                <aside className="w-64 hidden md:block border-r border-military-800 bg-military-950">
                    <Sidebar />
                </aside>

                {isMobileSidebarOpen && (
                    <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
                )}

                <aside className={`fixed inset-y-0 left-0 w-64 bg-military-950 z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-16
                    ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <Sidebar />
                </aside>

                <main className="flex-1 p-6 bg-military-900 relative w-full overflow-hidden">
                    <div className="max-w-7xl mx-auto rounded-sm border border-military-700 bg-military-layout p-6 min-h-[60vh] shadow-2xl backdrop-blur-sm relative z-10 w-full overflow-x-auto">
                        <Outlet />
                    </div>

                    <div className="fixed bottom-4 right-4 text-military-800 opacity-20 pointer-events-none font-stencil text-5xl md:text-9xl z-0 overflow-hidden whitespace-nowrap">
                        TOP SECRET
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default Layout;
