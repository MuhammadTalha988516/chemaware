import { Sparkles, Bot, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HealthTips = ({ tips }) => {
  const navigate = useNavigate()

  return (
    <div className="card bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-purple-200 animate-slideUp" style={{ animationDelay: '300ms' }}>
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2 shadow-sm">
          <Sparkles className="text-white" size={18} />
        </div>
        Health Tips by AI
      </h2>
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <div 
            key={tip.id} 
            className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-purple-100 hover:border-purple-200"
            style={{ animationDelay: `${400 + index * 50}ms` }}
          >
            <div className="flex items-start">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-2.5 mr-3 group-hover:scale-110 transition-transform">
                <tip.icon size={20} className="text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-purple-600 transition-colors">{tip.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{tip.description}</p>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" size={16} />
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => navigate('/ai-assistant')}
        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
      >
        <Bot size={18} />
        Ask AI Assistant
      </button>
    </div>
  )
}

export default HealthTips
