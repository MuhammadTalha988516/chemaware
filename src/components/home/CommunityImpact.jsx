import { Users, Award, TrendingUp, Globe } from 'lucide-react'

const CommunityImpact = ({ activeUsers, totalScans }) => {
  return (
    <div className="card bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-green-200 animate-slideUp" style={{ animationDelay: '400ms' }}>
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-2 shadow-sm">
          <Globe className="text-white" size={18} />
        </div>
        Community Impact
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="group bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="relative inline-block mb-2">
            <Users className="text-green-600" size={28} />
            <TrendingUp className="absolute -top-1 -right-1 text-green-500 animate-pulse-slow" size={14} />
          </div>
          <p className="text-2xl font-bold text-green-700 mb-1">
            {activeUsers.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 font-medium">Active Users</p>
        </div>
        <div className="group bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
          <div className="relative inline-block mb-2">
            <Award className="text-emerald-600" size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          </div>
          <p className="text-2xl font-bold text-emerald-700 mb-1">
            {totalScans.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 font-medium">Products Scanned</p>
        </div>
      </div>
      <div className="mt-4 bg-gradient-to-r from-white to-green-50 rounded-xl p-4 text-center shadow-sm border border-green-100">
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-bold text-green-600">Together</span>, we're making safer choices! 🌱
        </p>
        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
          <span>Growing every day</span>
        </div>
      </div>
    </div>
  )
}

export default CommunityImpact
