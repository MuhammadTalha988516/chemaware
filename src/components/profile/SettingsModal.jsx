import { X, Shield, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react'

const SettingsModal = ({ onClose, onChangePassword, onLogout }) => {
  const settingsItems = [
    {
      icon: Shield,
      label: 'Change Password',
      description: 'Update your account password',
      action: onChangePassword,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage notification preferences',
      action: () => alert('Notifications settings coming soon'),
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      description: 'Get help and contact support',
      action: () => alert('Help center coming soon'),
      gradient: 'from-green-500 to-emerald-600'
    }
  ]

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center animate-fadeIn">
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Settings Items */}
        <div className="p-6 space-y-3">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="group w-full flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white hover:from-white hover:to-gray-50 rounded-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:shadow-md"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <item.icon size={24} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" size={20} />
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-50 to-rose-50 hover:from-red-100 hover:to-rose-100 rounded-xl transition-all duration-300 border border-red-200 hover:shadow-md mt-6"
          >
            <LogOut size={20} className="text-red-600" />
            <span className="font-semibold text-red-600">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
