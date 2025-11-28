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
      color: 'from-blue-500 to-cyan-500',
    },
    {
      to: '/scan',
      icon: ScanLine,
      title: 'Scan Student ID',
      description: 'Verify registration via QR/Barcode',
      color: 'from-purple-500 to-pink-500',
    },
    {
      to: '/records',
      icon: Database,
      title: 'View Records',
      description: 'Browse all registered students',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      to: '/admin',
      icon: Shield,
      title: 'Admin Panel',
      description: 'Manage student registrations',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]"></div>
      <Navigation />
      
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img 
                src={huLogo} 
                alt="Haramaya University Logo" 
                className="w-32 h-32 object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Haramaya University
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent mb-6">
            PC Registration System
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Official platform for registering and managing student computer devices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {features.map((feature, index) => (
            <Link
              key={feature.to}
              to={feature.to}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="glass-card rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105 animate-fade-in backdrop-blur-xl bg-white/5 hover:bg-white/10">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-blue-500/20`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-card rounded-xl p-6 text-center backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">500+</div>
            <div className="text-sm text-slate-400">Active Users</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-sm text-slate-400">Trusted</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-sm text-slate-400">Available</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center backdrop-blur-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-white mb-2">Fast</div>
            <div className="text-sm text-slate-400">Processing</div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 glass-card px-6 py-3 rounded-full backdrop-blur-xl bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            <span className="text-sm font-medium text-emerald-400">System Online & Ready</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
