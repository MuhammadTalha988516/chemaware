import { Plus, X } from 'lucide-react'
import { useState } from 'react'

const FloatingActionButton = ({ actions }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-24 right-6 z-40">
      {/* Action buttons */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-scaleIn">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick()
                setIsOpen(false)
              }}
              className="group flex items-center gap-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pr-4 pl-3 py-3"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-full flex items-center justify-center`}>
                <action.icon size={20} className="text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Plus size={24} className="text-white" />
        )}
      </button>
    </div>
  )
}

export default FloatingActionButton
