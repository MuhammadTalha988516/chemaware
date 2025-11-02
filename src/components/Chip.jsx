import { X } from 'lucide-react'

const Chip = ({ 
  children, 
  onDelete,
  variant = 'default',
  icon: Icon,
  size = 'md'
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
    success: 'bg-green-100 text-green-700 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    danger: 'bg-red-100 text-red-700 hover:bg-red-200',
  }

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${variants[variant]} ${sizes[size]}`}>
      {Icon && <Icon size={14} />}
      {children}
      {onDelete && (
        <button
          onClick={onDelete}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <X size={14} />
        </button>
      )}
    </span>
  )
}

export default Chip
