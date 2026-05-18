import {
    LayoutDashboard,
    FolderKanban,
    Users,
    Trophy,
    MessageCircle,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    const navItems = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={22} />,
            path: "/dashboard",
        },

        {
            name: "Projects",
            icon: <FolderKanban size={22} />,
            path: "/projects",
        },

        {
            name: "Students",
            icon: <Users size={22} />,
            path: "/students",
        },

        {
            name: "Hackathons",
            icon: <Trophy size={22} />,
            path: "/hackathons",
        },

        {
            name: "Chat",
            icon: <MessageCircle size={22} />,
            path: "/Chat",
        },
    ];

    return (
        <div className="w-[240px] h-screen fixed bg-[#090B1A] border-r border-white/10 flex flex-col justify-between">

            {/* TOP */}
            <div>

                {/* LOGO */}
                <div className="p-8 border-b border-white/10">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                            ✦
                        </div>

                        <div>

                            <h1 className="text-4xl font-bold text-white">
                                Campus Hub
                            </h1>

                            <p className="text-slate-400">
                                Collaborate & Connect
                            </p>

                        </div>

                    </div>

                </div>

                {/* NAVIGATION */}
                <div className="p-4 space-y-3 mt-4">

                    {navItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300
                ${isActive
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                                    : "text-slate-300 hover:bg-white/5"
                                }`
                            }
                        >

                            {item.icon}

                            <span className="text-base font-medium">
                                {item.name}
                            </span>

                        </NavLink>

                    ))}

                </div>

            </div>

            {/* BOTTOM */}
            <div className="p-4 border-t border-white/10 space-y-3">

                <button
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-300 hover:bg-white/5 w-full"
                >

                    <User size={22} />

                    Profile

                </button>

                <button
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-slate-300 hover:bg-white/5 w-full"
                >

                    <Settings size={22} />

                    Settings

                </button>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-red-400 hover:bg-red-500/10 w-full"
                >

                    <LogOut size={22} />

                    Sign Out

                </button>

            </div>

        </div>
    );
};

export default Sidebar;