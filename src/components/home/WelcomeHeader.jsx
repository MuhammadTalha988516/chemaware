import { Activity, Sparkles } from 'lucide-react'

const WelcomeHeader = ({ userName }) => {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white px-6 pt-8 pb-12 rounded-b-3xl shadow-xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="animate-fadeIn">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">ChemAware</h1>
              <Sparkles size={20} className="text-yellow-300 animate-pulse-slow" />
            </div>
            <p className="text-primary-100">Stay safe, stay informed</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 animate-pulse-slow">
            <Activity size={24} />
          </div>
        </div>
        
        <div className="glass rounded-2xl p-4 border border-white/20 animate-slideUp">
          <p className="text-sm text-primary-100 mb-1">{greeting},</p>
          <p className="text-2xl font-bold">{userName}! 👋</p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeHeader
