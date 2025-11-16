import { Link, useLocation } from 'react-router-dom';
import { Home, FileEdit, ScanLine, Database, Shield } from 'lucide-react';
import huLogo from '@/assets/hu-logo.png';

const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/register', label: 'Register', icon: FileEdit },
    { to: '/scan', label: 'Scan', icon: ScanLine },
    { to: '/records', label: 'Records', icon: Database },
    { to: '/admin', label: 'Admin', icon: Shield },
  ];
  
  return (
    <nav className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={huLogo} 
              alt="HU Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold text-lg hidden sm:block">PC Registration</span>
          </Link>
          
          <div className="flex space-x-1 sm:space-x-2">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === to
                    ? 'bg-secondary text-primary'
                    : 'hover:bg-primary-foreground/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
