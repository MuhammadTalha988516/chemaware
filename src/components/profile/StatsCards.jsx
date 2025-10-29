import { Package, Activity, Flame, Award } from 'lucide-react'

const StatsCards = ({ stats }) => {
  const cards = [
    { 
      icon: Package, 
      value: stats.productsScanned, 
      label: 'Scans',
      gradient: 'from-blue-500 to-blue-600',
      bg: 'from-blue-50 to-blue-100'
    },
    { 
      icon: Activity, 
      value: stats.healthScore, 
      label: 'Score',
      gradient: 'from-green-500 to-emerald-600',
      bg: 'from-green-50 to-green-100'
    },
    { 
      icon: Flame, 
      value: stats.streakDays, 
      label: 'Streak',
      gradient: 'from-orange-500 to-red-500',
      bg: 'from-orange-50 to-orange-100'
    },
    { 
      icon: Award, 
      value: stats.achievements, 
      label: 'Awards',
      gradient: 'from-purple-500 to-pink-500',
      bg: 'from-purple-50 to-purple-100'
    },
  ]

  return (
    <div className="grid grid-cols-4 gap-3">
      {cards.map((card, index) => (
        <div 
          key={index}
          className={`group bg-gradient-to-br ${card.bg} rounded-xl p-3 text-center shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 animate-slideUp`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={`w-10 h-10 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-sm group-hover:scale-110 transition-transform`}>
            <card.icon className="text-white" size={20} />
          </div>
          <p className="text-lg font-bold text-gray-800">{card.value}</p>
          <p className="text-xs text-gray-600 font-medium">{card.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsCards
