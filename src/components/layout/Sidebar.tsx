import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  badge?: number;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/dashboard',
  },
  {
    id: 'employees',
    label: 'Employee Management',
    icon: '👥',
    children: [
      { id: 'employee-list', label: 'Employee List', icon: '📋', path: '/employees' },
      { id: 'attendance', label: 'Attendance', icon: '✅', path: '/attendance' },
    ],
  },
  {
    id: 'departments',
    label: 'Departments',
    icon: '🏢',
    path: '/departments',
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📈',
    path: '/reports',
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['employees']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleNavigation = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  const isActive = (path?: string) => {
    return path && location.pathname === path;
  };

  const hasActiveChild = (children?: MenuItem[]) => {
    return children?.some(child => isActive(child.path));
  };

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-2xl">👔</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">HR Dashboard</h1>
            <p className="text-xs text-gray-400">Employee System</p>
          </div>
        </div>
      </div>

      {/* Date Display */}
      <div className="px-6 py-4 text-sm text-gray-400 border-b border-gray-800">
        <p>{new Date().toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              {/* Parent Menu */}
              <button
                onClick={() => {
                  if (item.children) {
                    toggleExpand(item.id);
                  } else {
                    handleNavigation(item.path);
                  }
                }}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive(item.path) || hasActiveChild(item.children)
                    ? 'bg-amber-500 text-white shadow-lg' 
                    : 'hover:bg-gray-800 text-gray-300'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.children && (
                  <span className={`
                    transition-transform duration-200
                    ${expandedItems.includes(item.id) ? 'rotate-90' : ''}
                  `}>
                    ▶
                  </span>
                )}
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>

              {/* Children Menu (Expandable) */}
              {item.children && expandedItems.includes(item.id) && (
                <ul className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => handleNavigation(child.path)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-2 rounded-lg
                          text-sm transition-all duration-200
                          ${isActive(child.path)
                            ? 'bg-amber-500 text-white'
                            : 'hover:bg-gray-800 text-gray-400'
                          }
                        `}
                      >
                        <span>{child.icon}</span>
                        <span>{child.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 text-center">
          <p>HR Dashboard v1.0</p>
          <p className="mt-1">© 2024 SAGARA</p>
        </div>
      </div>
    </div>
  );
}