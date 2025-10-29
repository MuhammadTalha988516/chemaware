import { History, Clock, ChevronRight } from 'lucide-react'

const ScanHistory = ({ scans = [] }) => {
  if (scans.length === 0) return null

  return (
    <div className="card animate-slideUp" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-2">
            <History className="text-purple-600" size={18} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Recent Scans</h2>
        </div>
        <button className="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1 group">
          View All
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="space-y-2">
        {scans.slice(0, 3).map((scan, index) => (
          <div
            key={index}
            className="group flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 hover:border-primary-200"
            style={{ animationDelay: `${300 + index * 50}ms` }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
              <Clock className="text-white" size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate group-hover:text-primary-600 transition-colors">
                {scan.name}
              </p>
              <p className="text-xs text-gray-500">{scan.time}</p>
            </div>
            <ChevronRight className="text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" size={18} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScanHistory
