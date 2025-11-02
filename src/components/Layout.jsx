import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ScanLine, Bot, User } from 'lucide-react'

const Layout = ({ children }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    { path: '/', icon: Home, label: 'Home', badge: null },
    { path: '/scanner', icon: ScanLine, label: 'Scanner', badge: null },
    { path: '/ai-assistant', icon: Bot, label: 'AI Assistant', badge: 2 },
    { path: '/profile', icon: User, label: 'Profile', badge: null },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Main Content */}
      <main className="w-full animate-fadeIn">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="w-full px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map(({ path, icon: Icon, label, badge }) => {
              const isActive = location.pathname === path
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${
                    isActive
                      ? 'text-primary-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary-600 rounded-b-full" />
                  )}
                  
                  <div className={`relative transition-transform duration-200 ${isActive ? 'scale-110' : 'hover:scale-105'}`}>
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    {badge && badge > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse-slow">
                        {badge}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Layout
