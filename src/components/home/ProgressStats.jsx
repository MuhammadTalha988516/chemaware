import { TrendingUp, Package, Activity, Flame, Sparkles } from 'lucide-react'

const ProgressStats = ({ productsScanned, healthScore, streakDays }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'from-green-50 to-green-100'
    if (score >= 60) return 'from-yellow-50 to-yellow-100'
    return 'from-red-50 to-red-100'
  }

  const getScoreRing = (score) => {
    if (score >= 80) return 'stroke-green-500'
    if (score >= 60) return 'stroke-yellow-500'
    return 'stroke-red-500'
  }

  return (
    <div className="card animate-slideUp" style={{ animationDelay: '100ms' }}>
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
          <TrendingUp className="text-primary-600" size={18} />
        </div>
        Your Progress
      </h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="relative inline-block mb-2">
            <Package className="text-blue-600" size={24} />
            {productsScanned > 0 && (
              <Sparkles className="absolute -top-1 -right-1 text-yellow-500 animate-pulse-slow" size={12} />
            )}
          </div>
          <p className="text-2xl font-bold text-blue-700">{productsScanned}</p>
          <p className="text-xs text-blue-600 font-medium">Products</p>
        </div>
        
        <div className={`group bg-gradient-to-br ${getScoreBg(healthScore)} rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 relative overflow-hidden`}>
          {/* Circular progress indicator */}
          <div className="relative inline-block mb-2">
            <svg className="w-12 h-12 transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - healthScore / 100)}`}
                className={`${getScoreRing(healthScore)} transition-all duration-1000`}
                strokeLinecap="round"
              />
            </svg>
            <Activity className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${getScoreColor(healthScore)}`} size={20} />
          </div>
          <p className={`text-2xl font-bold ${getScoreColor(healthScore)}`}>{healthScore}</p>
          <p className={`text-xs ${getScoreColor(healthScore)} font-medium`}>Health Score</p>
        </div>
        
        <div className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <Flame className={`mx-auto mb-2 text-orange-600 ${streakDays > 0 ? 'animate-bounce-slow' : ''}`} size={24} />
          <p className="text-2xl font-bold text-orange-700">{streakDays}</p>
          <p className="text-xs text-orange-600 font-medium">Day Streak 🔥</p>
        </div>
      </div>
    </div>
  )
}

export default ProgressStats
