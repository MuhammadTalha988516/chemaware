import { ChevronRight, Settings } from 'lucide-react'

const MenuList = ({ menuItems }) => {
  const getIconGradient = (index) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-red-500',
      'from-green-500 to-emerald-600',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <div className="card animate-slideUp" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-2">
          <Settings className="text-gray-600" size={18} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Settings</h2>
      </div>
      <div className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.action}
            className="group w-full flex items-center justify-between p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white rounded-xl transition-all duration-300 border border-transparent hover:border-gray-200 hover:shadow-md"
            style={{ animationDelay: `${400 + index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${getIconGradient(index)} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                <item.icon className="text-white" size={20} />
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-primary-600 transition-colors">{item.label}</span>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" size={20} />
          </button>
        ))}
      </div>
    </div>
  )
}

export default MenuList
