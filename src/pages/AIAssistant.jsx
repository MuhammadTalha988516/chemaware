import { useState } from 'react'
import AssistantHeader from '../components/assistant/AssistantHeader'
import MessageList from '../components/assistant/MessageList'
import SuggestedQuestions from '../components/assistant/SuggestedQuestions'
import ChatInput from '../components/assistant/ChatInput'

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your AI Chemical Safety Assistant. Ask me anything about chemicals, ingredients, or product safety!",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const suggestedQuestions = [
    "What are parabens?",
    "Is sodium lauryl sulfate safe?",
    "How to read ingredient labels?",
    "What chemicals should I avoid?",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate AI response - Replace with actual AI API integration
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: "This is a placeholder response. Please integrate your AI model API here. I'll provide helpful information about chemical safety, ingredient analysis, and health recommendations based on your question.",
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question) => {
    setInputMessage(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      <AssistantHeader />

      <MessageList messages={messages} isTyping={isTyping} />

      {messages.length <= 1 && (
        <SuggestedQuestions 
          questions={suggestedQuestions}
          onQuestionClick={handleSuggestedQuestion}
        />
      )}

      <ChatInput 
        inputMessage={inputMessage}
        onInputChange={setInputMessage}
        onSend={handleSendMessage}
        disabled={!inputMessage.trim()}
      />
    </div>
  )
}

export default AIAssistant
