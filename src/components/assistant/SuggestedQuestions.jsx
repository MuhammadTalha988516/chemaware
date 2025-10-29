import { Lightbulb, Sparkles } from 'lucide-react'

const SuggestedQuestions = ({ questions, onQuestionClick }) => {
  return (
    <div className="px-6 pb-4 animate-slideUp">
      <div className="card bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-purple-200">
        <div className="flex items-center mb-3">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-2 shadow-sm">
            <Lightbulb className="text-white" size={16} />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">Suggested Questions</h3>
          <Sparkles className="ml-auto text-purple-400 animate-pulse-slow" size={16} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {questions.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuestionClick(question)}
              className="group text-left text-xs bg-white hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 text-gray-700 px-3 py-2.5 rounded-xl transition-all border border-purple-200 hover:border-purple-300 hover:shadow-md active:scale-95"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="group-hover:text-purple-700 transition-colors">{question}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SuggestedQuestions
