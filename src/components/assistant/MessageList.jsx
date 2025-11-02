import { Sparkles, Bot } from 'lucide-react'
import { useRef, useEffect } from 'react'

const MessageList = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideUp`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {message.type === 'bot' && (
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
              <Bot size={18} className="text-white" />
            </div>
          )}
          <div
            className={`max-w-[75%] rounded-2xl px-4 py-3 ${
              message.type === 'user'
                ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-br-sm shadow-md'
                : 'bg-white text-gray-800 rounded-bl-sm shadow-md border border-gray-100 hover:shadow-lg transition-shadow'
            }`}
          >
            {message.type === 'bot' && (
              <div className="flex items-center mb-2">
                <Sparkles size={14} className="text-purple-600 mr-1.5 animate-pulse-slow" />
                <span className="text-xs font-semibold text-purple-600">AI Assistant</span>
              </div>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
            <p
              className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-primary-100' : 'text-gray-400'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          {message.type === 'user' && (
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center ml-2 flex-shrink-0 shadow-md text-white font-semibold text-sm">
              U
            </div>
          )}
        </div>
      ))}

      {isTyping && (
        <div className="flex justify-start animate-fadeIn">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-2 flex-shrink-0 shadow-md">
            <Bot size={18} className="text-white" />
          </div>
          <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-4 shadow-md border border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2.5 h-2.5 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
