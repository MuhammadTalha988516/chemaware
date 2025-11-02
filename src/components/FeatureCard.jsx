const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }) => {
  return (
    <div 
      className="group card hover:shadow-xl transition-all duration-300 cursor-pointer animate-slideUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <Icon size={28} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}

export default FeatureCard
