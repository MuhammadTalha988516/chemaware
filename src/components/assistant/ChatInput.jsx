import { Send, MessageCircle, Sparkles } from 'lucide-react'

const ChatInput = ({ inputMessage, onInputChange, onSend, disabled }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="bg-gradient-to-t from-white via-white to-gray-50 border-t border-gray-200 px-6 py-4 pb-20">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about chemical safety..."
            rows="1"
            className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all shadow-sm hover:shadow-md"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          <Sparkles className="absolute right-3 top-3 text-gray-300" size={18} />
        </div>
        <button
          onClick={onSend}
          disabled={disabled}
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${
            !disabled
              ? 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:scale-110 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send size={20} />
        </button>
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
          <MessageCircle size={12} />
          Integrate your AI model API for real responses
        </p>
      </div>
    </div>
  )
}

export default ChatInput
