import { Link } from 'react-router-dom';
import { FileEdit, ScanLine, Shield, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import huLogo from '@/assets/hu-logo.png';

const Home = () => {
  const features = [
    {
      to: '/register',
      icon: FileEdit,
      title: 'Proceed to Registration',
      description: 'Register your PC with the university',
      color: 'from-primary to-primary/80',
    },
    {
      to: '/scan',
      icon: ScanLine,
      title: 'Scan Student ID',
      description: 'Verify registration via QR/Barcode',
      color: 'from-secondary to-secondary/80',
    },
    {
      to: '/records',
      icon: Database,
      title: 'View Records',
      description: 'Browse all registered students',
      color: 'from-primary to-primary/80',
    },
    {
      to: '/admin',
      icon: Shield,
      title: 'Admin Panel',
      description: 'Manage student registrations',
      color: 'from-secondary to-secondary/80',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-hu-gray via-white to-hu-gray">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <img 
              src={huLogo} 
              alt="Haramaya University Logo" 
              className="w-40 h-40 object-contain drop-shadow-2xl animate-scale-in"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Haramaya University
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-2">
            PC Registration System
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Official platform for registering and managing student computer devices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Link
              key={feature.to}
              to={feature.to}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-primary group-hover:scale-105 animate-fade-in">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">System Online & Ready</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
