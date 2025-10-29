import { ScanLine, Upload, Search, Target, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const QuickActions = () => {
  const navigate = useNavigate()

  const quickActions = [
    { 
      icon: ScanLine, 
      label: 'Scan Barcode', 
      gradient: 'from-blue-500 to-blue-600',
      shadow: 'shadow-blue-200',
      action: () => navigate('/scanner')
    },
    { 
      icon: Upload, 
      label: 'Upload Photo', 
      gradient: 'from-green-500 to-emerald-600',
      shadow: 'shadow-green-200',
      action: () => navigate('/scanner')
    },
    { 
      icon: Search, 
      label: 'Search Chemicals', 
      gradient: 'from-purple-500 to-purple-600',
      shadow: 'shadow-purple-200',
      action: () => navigate('/scanner')
    },
  ]

  return (
    <div className="card animate-slideUp ">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
          <Zap className="text-primary-600" size={18} />
        </div>
        Quick Actions
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="group flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`bg-gradient-to-br ${action.gradient} w-12 h-12 rounded-2xl flex items-center justify-center mb-2 shadow-lg ${action.shadow} group-hover:scale-110 transition-transform duration-300`}>
              <action.icon size={22} className="text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center leading-tight">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions
