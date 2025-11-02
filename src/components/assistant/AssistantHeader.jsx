import { Bot, Sparkles } from 'lucide-react'

const AssistantHeader = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white px-6 pt-8 pb-6 rounded-b-3xl shadow-xl relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 animate-fadeIn">
        <div className="flex items-center mb-2">
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mr-3 backdrop-blur-sm border border-white/30">
              <Bot size={26} />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">AI Assistant</h1>
              <Sparkles size={18} className="text-yellow-300 animate-pulse-slow" />
            </div>
            <p className="text-purple-100 text-sm">Your chemical safety expert</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssistantHeader
