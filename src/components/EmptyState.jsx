const EmptyState = ({ icon: Icon, title, description, action, actionLabel }) => {
  return (
    <div className="text-center py-12 px-6 animate-fadeIn">
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
        <Icon className="text-gray-400" size={40} />
      </div>
      <h3 className="text-lg font-bold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">{description}</p>
      {action && actionLabel && (
        <button
          onClick={action}
          className="btn-primary shadow-lg hover:shadow-xl"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
