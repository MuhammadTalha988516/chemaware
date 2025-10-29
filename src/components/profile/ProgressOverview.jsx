import { TrendingUp, Target, Zap } from 'lucide-react'

const ProgressOverview = ({ stats }) => {
  const progressItems = [
    {
      label: 'Health Score',
      value: stats.healthScore,
      max: 100,
      gradient: 'from-green-500 to-emerald-600',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Scans to Next Level',
      value: stats.productsScanned,
      max: 50,
      gradient: 'from-blue-500 to-blue-600',
      icon: Target,
      color: 'text-blue-600'
    }
  ]

  return (
    <div className="card bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200 animate-slideUp" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-sm">
          <Zap className="text-white" size={18} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">Your Progress</h2>
      </div>
      <div className="space-y-4">
        {progressItems.map((item, index) => (
          <div key={index} className="group" style={{ animationDelay: `${300 + index * 50}ms` }}>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <item.icon size={16} className={item.color} />
                <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
              </div>
              <span className={`font-bold ${item.color}`}>
                {item.value}/{item.max}
              </span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className={`bg-gradient-to-r ${item.gradient} h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                style={{ width: `${Math.min((item.value / item.max) * 100, 100)}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" 
                     style={{ backgroundSize: '200% 100%' }} />
              </div>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">
                {Math.round((item.value / item.max) * 100)}% Complete
              </span>
              <span className="text-xs text-gray-500">
                {item.max - item.value} to go
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressOverview
