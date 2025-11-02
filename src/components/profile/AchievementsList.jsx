import { Award, Trophy, ChevronRight, Sparkles } from 'lucide-react'

const AchievementsList = ({ achievements }) => {
  const earnedCount = achievements.filter(a => a.earned).length

  return (
    <div className="card animate-slideUp" style={{ animationDelay: '100ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-2 shadow-sm">
            <Trophy className="text-white" size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Achievements</h2>
            <p className="text-xs text-gray-500">{earnedCount} of {achievements.length} earned</p>
          </div>
        </div>
        <button className="text-sm text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1 group">
          View All
          <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className={`group relative text-center p-3 rounded-xl transition-all duration-300 cursor-pointer ${
              achievement.earned
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:shadow-lg hover:scale-105'
                : 'bg-gray-50 border-2 border-gray-200 opacity-50 hover:opacity-70'
            } animate-scaleIn`}
            style={{ animationDelay: `${200 + index * 50}ms` }}
          >
            {achievement.earned && (
              <Sparkles className="absolute top-1 right-1 text-yellow-500 animate-pulse-slow" size={12} />
            )}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${
              achievement.earned 
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-md' 
                : 'bg-gray-200'
            }`}>
              <achievement.icon
                size={24}
                className={achievement.earned ? 'text-white' : 'text-gray-400'}
              />
            </div>
            <p className={`text-xs font-semibold leading-tight ${
              achievement.earned ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {achievement.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsList
