import { Package, Clock, ChevronRight } from 'lucide-react'

const RecentScans = ({ scans }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600'
    if (score >= 60) return 'from-yellow-500 to-orange-600'
    return 'from-red-500 to-rose-600'
  }

  if (scans.length === 0) {
    return (
      <div className="card animate-slideUp" style={{ animationDelay: '200ms' }}>
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
            <Clock className="text-primary-600" size={18} />
          </div>
          Recent Scans
        </h2>
        <div className="text-center py-8">
          <Package className="mx-auto text-gray-300 mb-3" size={48} />
          <p className="text-gray-500 text-sm">No scans yet</p>
          <p className="text-gray-400 text-xs mt-1">Start scanning products to see them here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card animate-slideUp" style={{ animationDelay: '200ms' }}>
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-2">
          <Clock className="text-primary-600" size={18} />
        </div>
        Recent Scans
      </h2>
      <div className="space-y-3">
        {scans.map((scan, index) => (
          <div
            key={scan.id}
            className="group flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
            style={{ animationDelay: `${300 + index * 50}ms` }}
          >
            <div className="flex items-center flex-1 gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${getScoreGradient(scan.healthScore)} rounded-lg flex items-center justify-center shadow-sm`}>
                <Package className="text-white" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm group-hover:text-primary-600 transition-colors">{scan.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} />
                  {scan.date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1.5 rounded-full ${getScoreBg(scan.healthScore)} shadow-sm`}>
                <span className={`text-sm font-bold ${getScoreColor(scan.healthScore)}`}>
                  {scan.healthScore}
                </span>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" size={18} />
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2.5 text-primary-600 font-semibold text-sm hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 flex items-center justify-center gap-1 group">
        View All Scans 
        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={16} />
      </button>
    </div>
  )
}

export default RecentScans
