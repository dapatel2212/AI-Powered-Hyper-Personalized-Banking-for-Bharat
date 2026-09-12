import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HomeIcon, UserIcon, BellIcon, HeartIcon, AcademicCapIcon, ShieldCheckIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import LanguageSwitcher from './LanguageSwitcher';
import DemoModeSwitcher from './DemoModeSwitcher';

export default function DashboardLayout({ children }) {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { name: t('common.home'), path: '/dashboard', icon: HomeIcon },
    { name: 'Wellness', path: '/wellness', icon: HeartIcon },
    { name: 'Literacy', path: '/literacy', icon: AcademicCapIcon },
    { name: 'Consent', path: '/consent', icon: ShieldCheckIcon },
    { name: 'AI Chat', path: '/whatsapp', icon: ChatBubbleOvalLeftIcon },
    { name: t('common.profile'), path: '/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col fixed inset-y-0 shadow-sm z-20">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <span className="text-xl text-primary">✦</span>
            <div>
              <h1 className="text-2xl font-bold text-primary leading-none">BankBuddy</h1>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 mt-1 font-semibold">AI Banking for Bharat</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path ? 'bg-primary/10 text-primary font-medium shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:translate-x-1'
              }`}
            >
              <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-primary' : 'text-gray-400'}`} />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 bg-white">
          <DemoModeSwitcher />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="md:hidden">
            <h1 className="text-xl font-bold text-primary">BankBuddy</h1>
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 max-w-5xl mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex justify-around p-2 z-50">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-lg ${
              location.pathname === item.path ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
