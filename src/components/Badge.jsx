const Badge = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  dot = false,
  pulse = false 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
    gray: 'bg-gray-500 text-white',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  }

  if (dot) {
    return (
      <span className="relative inline-flex">
        {children}
        <span className={`absolute top-0 right-0 flex h-3 w-3 ${pulse ? 'animate-ping' : ''}`}>
          <span className={`absolute inline-flex h-full w-full rounded-full ${variants[variant]} opacity-75`}></span>
        </span>
        <span className={`absolute top-0 right-0 inline-flex rounded-full h-3 w-3 ${variants[variant]}`}></span>
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center font-semibold rounded-full ${variants[variant]} ${sizes[size]} ${pulse ? 'animate-pulse-slow' : ''}`}>
      {children}
    </span>
  )
}

export default Badge
