const StatCard = ({ icon: Icon, value, label, gradient, trend, delay = 0 }) => {
  return (
    <div 
      className="group card hover:shadow-lg transition-all duration-300 cursor-pointer animate-slideUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            trend > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
    </div>
  )
}

export default StatCard
