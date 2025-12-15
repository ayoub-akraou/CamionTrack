import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Truck, LayoutDashboard, Settings, LogOut, Map, FileText } from 'lucide-react';
import clsx from 'clsx';

function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { name: 'Camions', path: '/admin/trucks', icon: Truck },
    { name: 'Remorques', path: '/admin/trailers', icon: Truck },
    { name: 'Trajets', path: '/admin/trips', icon: Map },
    { name: 'Configuration', path: '/admin/config', icon: Settings },
  ];

  const driverLinks = [
    { name: 'Mes Trajets', path: '/driver', icon: Map },
    // { name: 'Rapports', path: '/driver/reports', icon: FileText },
  ];

  const links = user?.role === 'admin' ? adminLinks : driverLinks;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 flex items-center space-x-2 border-b">
          <Truck className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">CamionTrack</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                  location.pathname === link.path
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center lg:hidden">
          <span className="font-bold text-gray-800">CamionTrack</span>
          {/* Mobile menu button could go here */}
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
