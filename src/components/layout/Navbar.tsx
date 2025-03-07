
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  // Check if user is on the landing page
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // For demonstration purposes, we're checking if the path includes dashboard
    // In a real app, this would be replaced with proper auth checking
    setIsAuthenticated(location.pathname.includes('dashboard'));
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'About', path: '/#about' },
  ];

  // Authenticated links
  const authLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Appointments', path: '/dashboard/appointments' },
    { name: 'Clients', path: '/dashboard/clients' },
    { name: 'Finance', path: '/dashboard/finance' },
  ];

  return (
    <header 
      className={cn(
        'fixed w-full z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-12',
        isScrolled ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' : 
          isLandingPage ? 'bg-transparent' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-nurse-500 to-nurse-700 flex items-center justify-center">
            <span className="text-white font-bold text-xl">NS</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline-block text-gray-900 dark:text-white">Nurse-Sync</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {(isAuthenticated ? authLinks : navLinks).map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                'text-gray-700 dark:text-gray-300 hover:text-nurse-600 dark:hover:text-nurse-400 transition-colors',
                'text-sm font-medium',
                location.pathname === link.path && 'text-nurse-600 dark:text-nurse-400 font-semibold'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard/settings">
                <Button variant="outline" size="sm" className="rounded-full">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm" className="bg-nurse-600 hover:bg-nurse-700">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 pt-20 animate-fade-in">
          <div className="flex flex-col p-6 space-y-6">
            {(isAuthenticated ? authLinks : navLinks).map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-gray-700 dark:text-gray-300 text-lg font-medium',
                  location.pathname === link.path && 'text-nurse-600 dark:text-nurse-400 font-semibold'
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/dashboard/settings" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <Link
                    to="/"
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button className="w-full bg-nurse-600 hover:bg-nurse-700">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
