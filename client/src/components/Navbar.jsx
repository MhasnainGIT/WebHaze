import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
    { name: 'About', to: '/about' },
    { name: 'Account', to: '/account' },
    { name: 'Contact us', to: '/contact' }
];

const servicesMenu = [
    { name: 'Web hosting', to: '/services/web-hosting' },
    { name: 'Website development', to: '/services/website-development' },
    { name: 'App development', to: '/services/app-development' }
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200
        ${isScrolled ? 'py-4 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-6'}
      `}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            WebHaze
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200">Home</Link>

                        {/* Services dropdown */}
                        <div className="relative group">
                            <div className="group inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-transparent hover:bg-gray-100/80 backdrop-blur-sm transition-all duration-200 text-base font-medium border border-transparent hover:border-gray-200/50 cursor-pointer">
                                <span className="text-gray-700 group-hover:text-primary transition-colors">Services</span>
                                <svg className="w-4 h-4 text-gray-500 group-hover:text-primary transition-all duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.98l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 z-50 overflow-hidden border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
                                <div className="p-2">
                                    {servicesMenu.map((s, index) => {
                                        const icons = [
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                        ];
                                        return (
                                            <Link key={s.name} to={s.to} className="group/item flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary hover:transform hover:scale-[1.02]">
                                                <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 bg-gray-100 text-gray-600 group-hover/item:bg-primary/20 group-hover/item:text-primary">
                                                    {icons[index]}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-sm">{s.name}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">Professional {s.name.toLowerCase()} solutions</div>
                                                </div>
                                                <svg className="w-4 h-4 transition-transform duration-200 group-hover/item:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {navItems.filter(item => item.name !== 'Account' || user).map((item) => (
                            <Link key={item.name} to={item.to} className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 transition-all duration-200">
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden md:flex items-center space-x-3">
                        {user ? (
                            <Menu as="div" className="relative inline-block text-left">
                                <Menu.Button className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 border border-gray-200/50">
                                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-sm font-bold">
                                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                    </div>
                                    <span className="text-gray-700 font-medium">{user.name}</span>
                                    <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.98l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                                    </svg>
                                </Menu.Button>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-150"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-100"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-gray-200/50 focus:outline-none z-50 overflow-hidden border border-white/20">
                                        <div className="p-2">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/account" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                        My Account
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${active ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                        Dashboard
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <div className="border-t border-gray-200/50 my-2"></div>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button onClick={logout} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${active ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Sign Out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors duration-200">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Menu as="div" className="relative inline-block text-left">
                            <Menu.Button className="p-2 hover:bg-gray-100 rounded-lg">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </Menu.Button>

                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-95 opacity-0"
                                enterTo="transform scale-100 opacity-100"
                                leave="transition duration-75 ease-in"
                                leaveFrom="transform scale-100 opacity-100"
                                leaveTo="transform scale-95 opacity-0"
                            >
                                <Menu.Items className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {servicesMenu.map((s) => (
                                            <Menu.Item key={s.name}>
                                                {({ active }) => (
                                                    <Link
                                                        to={s.to}
                                                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}
                                                    >
                                                        {s.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        {navItems.filter(item => item.name !== 'Account' || user).map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({ active }) => (
                                                    <Link to={item.to} className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}
                                        {user ? (
                                            <>
                                                <Menu.Item>
                                                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700">
                                                        My Account
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600">
                                                        Sign Out
                                                    </button>
                                                </Menu.Item>
                                            </>
                                        ) : (
                                            <>
                                                <Menu.Item>
                                                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700">
                                                        Sign In
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to="/signup" className="block px-4 py-2 text-sm text-primary font-medium">
                                                        Start Free
                                                    </Link>
                                                </Menu.Item>
                                            </>
                                        )}
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;